import { config } from "dotenv";
config();
import express, { Application, Request } from "express";
import logger from "morgan";
import methodOverride from "method-override";

import connectDB from "./database/connection";

// Init Express
const app:Application = express();

// Establish DB Connection
connectDB().catch(err => {
    console.error(err);
    process.exit(1);
});

// Logging
if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
}

// Body Parser
app.use(express.urlencoded({
    extended: false,
}));
app.use(express.json());

// Method Override
app.use(methodOverride((req:Request) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Routes
import url from "./routes/url";
app.use("/api/url", url);

// Define Port
const port:string|number = process.env.PORT || 3000;

// App Listen
app.listen(port, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${port}`));
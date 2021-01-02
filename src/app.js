'use strict';

const config = require('../config');
const { join } = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const methodOverride = require('method-override');
const connectDB = require('../database/db');

// Connect to MongoDB
connectDB();

const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Body Parser
app.use(express.urlencoded({
	extended: false,
}));
app.use(express.json());

// Method Override
app.use(methodOverride((req, res) => {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		const method = req.body._method;
		delete req.body._method;
		return method;
	}
}))

// View Engine
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('../routes/index'));
app.use('/api/url', require('../routes/url.js'));

// Static Folder
app.use(express.static(join(__dirname, '../public')));

app.listen(config.port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${config.port}`));
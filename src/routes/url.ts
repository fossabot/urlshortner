import express, { Request, Response } from "express";
import { isUri } from "valid-url";
import { generate } from "shortid";
const router = express.Router();

// Import Model
import Url from "../models/Url";

// @route   POST /shorten
// @desc    Create short Url
router.post("/shorten", async (req:Request, res:Response) => {
   const { longUrl } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   const baseUrl:string = process.env.BASE_URL!;

   // Check if baseUrl is valid
    if (!isUri(baseUrl)) {
        return res.status(400).json("Invalid base url");
    }

    // Create url code
    const urlCode = generate();

    // Check if longUrl is valid
    if (isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) {
                res.sendStatus(409).json("Resource already exists");
            }
            else {
                const shortUrl = baseUrl + "/" + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                });

                await url.save();

                res.sendStatus(201).json(`${shortUrl}`);
            }
        }
        catch (err) {
            console.error(err);
            return res.status(400).json("Invalid long url");
        }
    }
    else {
        return res.status(400).json("Invalid long url");
    }
});

export default router;
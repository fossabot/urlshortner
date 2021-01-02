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
   const baseUrl:string = process.env.BASE_URL!;

   // Check if baseUrl is valid
    if (!isUri(baseUrl)) {
        return res.status(400).json("Invalid base url");
    }
});

export default router;
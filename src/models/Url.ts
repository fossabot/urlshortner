import { model, Schema, Document } from "mongoose";

export interface IUrl extends Document {
    urlCode: string,
    longUrl: string,
    shortUrl: string,
    createdAt: string,
}

const UrlSchema = new Schema({
    urlCode: {
        type: String,
        unique: true,
        required: true,
    },
    longUrl: {
        type: String,
        unique: true,
        required: true,
    },
    shortUrl: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model<IUrl>("Url", UrlSchema);
import express from "express";
import asyncHandler from "express-async-handler";
import uploadOnCloudinary from "../middlewares/cloudinary.js";
import {upload} from "../middlewares/multer.js";
import { bookingModel } from "../models/bookingModel.js";

const docrouter = express.Router();

docrouter.post("/docs",upload.single('files', 100), asyncHandler(async (req, res) => {
    // const { secure_url, public_id } = req.file;
    // const id = req.query?.id
    console.log( req.file, 'bookingData');
    return
    const doc = await bookingModel.update({ secure_url, public_id });
    res.status(201).json(doc);
}));

export default docrouter;
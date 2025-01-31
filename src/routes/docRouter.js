import express from "express";
import asyncHandler from "express-async-handler";
import uploadOnCloudinary from "../middlewares/cloudinary.js";
import {upload} from "../middlewares/multer.js";
import { bookingModel } from "../models/bookingModel.js";

const docrouter = express.Router();



export default docrouter;
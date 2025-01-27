import { v2 as cloudinary } from "cloudinary";
import expressAsyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath, publicId, resource) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: resource || "auto",
        public_id: publicId,
      });
  
      console.log(result, "Cloudinary upload result");
  
      // Check if the URL is present
      if (result.url) {
        fs.unlinkSync(filePath);  // Clean up the local file after upload
        return result.url;        // Return the Cloudinary URL
      }
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      fs.unlinkSync(filePath);  // Clean up the local file even if there’s an error
      throw new Error('Failed to upload file to Cloudinary');
    }
  };

export default uploadOnCloudinary;

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (path) => {
    try {
        if(!path) return "No file found";
        const result =  await cloudinary.uploader.upload(path,{resource_type: 'auto', public_id: path});
        console.log(result, 'result');
        if(result.hasOwnProperty('url')) fs.unlinkSync(path);
        return result.url;
    } catch (error) {
        fs.unlinkSync(path);
        return error;  
    }
}

export default uploadOnCloudinary;
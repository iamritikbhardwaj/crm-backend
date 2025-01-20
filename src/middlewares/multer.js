import multer from 'multer';
import fs from 'fs';
import e from 'express';

// const id = req.params.id;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    const {id} = req.query;
        if (!fs.existsSync(`./public/temp/${id ? id : ''}`)) {
            fs.mkdirSync(`./public/temp/${id ? id : ''}`, { recursive: true });
            return cb(null, `./public/temp/${id ? id : ''}`);
        }else{
        return cb(null, `./public/temp`);
        }
    },
    filename: function (req, file, cb) {
        console.log(file, 'file');
        return cb(null, file.originalname);
    },
});

export const upload = multer({ 
    storage,
 });
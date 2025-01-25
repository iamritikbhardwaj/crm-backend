import multer from 'multer';
import fs from 'fs';

const tempDir = `public/temp/${Date.now()}`;
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// const id = req.params.id;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       if(file) return cb(null, tempDir);
       return false
    },
    filename: function (req, file, cb) {
       if(file) return cb(null, file.originalname + file.fieldname);
       return false
    },
});

export const upload = multer({ 
    storage,
 }).fields([
    { name: 'airTicket', maxCount: 10 },
    { name: 'passport', maxCount: 10 },
    { name: 'freezeQuotation', maxCount: 10 },
    { name: 'pan', maxCount: 10 },
    { name: 'emailConf', maxCount: 10 }
]);
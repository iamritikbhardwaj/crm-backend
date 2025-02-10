import multer from 'multer';
import fs from 'fs';

const tempDir = `public/temp`;
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       if(file) return cb(null, tempDir);
       return false
    },
    filename: function (req, file, cb) {
        const name = file.originalname.split('.')[0];
       if(file) return cb(null, name + file.fieldname);
       return false
    },
});

export const upload = multer({ 
    storage,
 }).fields([
    { name: 'airTicketdoc', maxCount: 10 },
    { name: 'passportdoc', maxCount: 10 },
    { name: 'freezeQuotation', maxCount: 10 },
    { name: 'pandoc', maxCount: 10 },
    { name: 'miscdoc', maxCount: 10 },
    { name: 'emailConfdoc', maxCount: 10 },
    { name: 'hotelvoucher', maxCount: 10 },
    { name: 'activitiesvoucher', maxCount: 10 },
    { name: 'miscvoucher', maxCount: 10 },
]);
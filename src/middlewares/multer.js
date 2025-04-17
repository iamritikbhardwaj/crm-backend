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
       if(file) return cb(null, name.includes(file.fieldname) ? name : name + file.fieldname);
       return false
    },
});

export const upload = multer({ 
    storage,
 }).fields([
    { name: 'airTicketdoc', maxCount: 20 },
    { name: 'passportdoc', maxCount: 20 },
    { name: 'freezeQuotation', maxCount: 20 },
    { name: 'pandoc', maxCount: 20 },
    { name: 'miscdoc', maxCount: 20 },
    { name: 'emailConfdoc', maxCount: 20 },
    { name: 'hotelvoucher', maxCount: 20 },
    { name: 'activitiesvoucher', maxCount: 20 },
    { name: 'miscvoucher', maxCount: 20 },
]);
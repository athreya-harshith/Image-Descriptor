import multer from "multer";
import { Request, Response } from "express";
const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = multer({
    storage: storage,
});
export default {
    upload
}

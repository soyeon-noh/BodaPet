import multer from "multer";
import path from "path";
import { v4 } from "uuid";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const fileType = path.extname(file.originalname);
    cb(null, v4() + fileType);
  },
});

export const multerUpload = multer({
  storage: fileStorage,
  limits: {
    files: 1,
  },
});

export default multerUpload;

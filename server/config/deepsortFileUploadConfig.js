import multer from "multer";
import path from "path";
import fs from "fs";

try {
  fs.readdirSync("deepsort_upload");
} catch (err) {
  console.error("deepsort_upload 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("deepsort_upload");
}

const fileStorage = multer.diskStorage({
  // 저장 폴더 위치
  destination: (req, file, cb) => {
    cb(null, "deepsort_upload/");
  },
  //파일이름
  filename: (req, file, cb) => {
    // const ext = path.extname(file.originalname);
    // cb(null, path.basename(file.originalname, ext));
    cb(null, file.originalname);
  },
});
export const multerUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB 로 제한
  },
});

export default multerUpload;

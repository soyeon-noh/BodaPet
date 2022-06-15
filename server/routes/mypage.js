import express from "express";
import PET from "../models/pet.js";
import multerUpload from "../config/detectFileUploadConfig.js";
import request from "request";

const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.send("/mypage/   respond with a resource");
});

router.get("/pet", async (req, res, next) => {
  // 로그인 성공시 변경할 코드
  // const user = req.user;
  const user = { userId: "test" };
  const pets = await PET.find({ userId: user.userId });
  console.log("pet get 데이터", pets);

  res.json({ pets });
});

router.post("/pet", async (req, res, next) => {
  // 로그인 성공시 변경할 코드
  // const user = req.user;
  const user = { userId: "test" };
  console.log("pet post 데이터- ", req.body);
  console.log("pet req.file 데이터- ", req.file);
  const petJson = req.body;

  // pet 데이터 수정 후

  await PET.create(petJson);
  res.json({ success: true });
});

router.post("/video", multerUpload.single("file"), async (req, res, next) => {
  console.log("req: ", req);
  console.log("비디오패치에 넘겨온 req.file: ", req.file);
  console.log("비디오패치에 넘겨온 req.body: ", req.body);

  // console.log("폼에 정의된 필드명 : ", reqFile.fieldname);
  // console.log("사용자가 업로드한 파일 명 : ", reqFile.originalname);
  // console.log("파일의 엔코딩 타입 : ", reqFile.encoding);
  // console.log("파일의 Mime 타입 : ", reqFile.mimetype);
  // console.log("파일이 저장된 폴더 : ", reqFile.destination);
  // console.log("destinatin에 저장된 파일 명 : ", reqFile.filename);
  // console.log("업로드된 파일의 전체 경로 ", reqFile.path);
  // console.log("파일의 바이트(byte 사이즈)", reqFile.size);

  const YoloResult = (callback) => {
    const options = {
      method: "GET",
      uri: "http://localhost:5000/yolov5",
      qs: {
        name: "test name",
        filePath: "server/detect_upload/ruby.MOV",
      },
    };

    request(options, (err, res, body) => {
      callback(undefined, { result: body });
    });
  };

  YoloResult((err, { result } = {}) => {
    if (err) {
      console.log("error!!!");
    }
    console.log(`${result}!!!`);
  });

  // const yolov5Fetch = async() =>{
  //   const res = await fetch(`http://localhost:5000/yolov5`, {
  //   method:"POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: {"filePath": "test filepath"}
  // })
  // if(res.status === 404){
  //   alert("flask 서버 yolov5 fetch 실패 ")
  // }
  // console.log("flask yolov5 fetch 실행완료",res.status);

  // }
  // yolov5Fetch();

  res.json({ videoPath: req.file.path });
});
export default router;

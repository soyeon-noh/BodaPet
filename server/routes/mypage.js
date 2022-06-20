import express from "express";
import PET from "../models/pet.js";
import REPORT from "../models/report.js";
import multerUpload from "../config/detectFileUploadConfig.js";
import request from "request";
import report from "../models/report.js";

const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.send("/mypage/   respond with a resource");
});

router.get("/pet/:user", async (req, res, next) => {
  // 로그인 성공시 변경할 코드
  // const user = req.user;
  // const user = { userId: "test" };

  const userId = req.params.user;
  console.log("pet get 데이터 userId", userId);
  const pets = await PET.find({ userId: userId });

  res.json({ pets });
});

router.post("/pet", async (req, res, next) => {
  // 로그인 성공시 변경할 코드
  // const user = req.user;
  // const user = { userId: "test" };
  console.log("pet post 데이터- ", req.body);
  console.log("pet req.file 데이터- ", req.file);
  const petJson = req.body;

  // pet 데이터 수정 후

  await PET.create(petJson);
  res.json({ success: true });
});

router.post("/petDelete", async (req, res, next) => {
  const petJson = req.body;
  const { petId } = petJson;
  await PET.deleteOne({ petId: petId });
  res.json({ success: true });
});

router.get("/user/:user", async (req, res, next) => {
  const { user } = req.params;

  const reportList = await REPORT.find({ userId: user });
  const dateList = reportList.map((report) => report.date);
  res.json({ dateList });
});

router.post("/video", multerUpload.single("file"), async (req, res, next) => {
  console.log("req: ", req);
  console.log("비디오패치에 넘겨온 req.file: ", req.file);
  console.log("비디오패치에 넘겨온 req.body: ", req.body);

  console.log("비디오패치에 넘겨온 req.file.path: ", req.file.path);
  console.log("비디오패치에 넘겨온 req.body.name: ", req.body.name);

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
        name: req.body.name,
        filePath: req.file.path,
      },
    };

    request(options, (err, res, body) => {
      callback(undefined, { result: body });
    });
  };

  // YoloResult((err, { result } = {}) => {
  //   if (err) {
  //     console.log("error!!!");
  //   }
  //   console.log(`${result}!!!`);
  // });

  // res.json({ success: true, videoPath: req.file.path });

  // 파이썬에서 success 보내오면 아래와같이 수정
  YoloResult((err, { result } = {}) => {
    if (err) {
      console.log("error!!!");
    }
    console.log(`${result}!!!`);
    // if (result == "success") {
    res.json({ success: true, videoPath: req.file.path });
    // }
  });
});

router.get("/vgg", async (req, res, next) => {
  const YoloResult = (callback) => {
    const options = {
      method: "GET",
      uri: "http://localhost:5000/vgg",
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

  res.json({ success: true });
});
export default router;

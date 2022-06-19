import express from "express";
import REPORT from "../models/report.js";
import multerUpload from "../config/deepsortFileUploadConfig.js";
import request from "request";
import ffmpeg from "fluent-ffmpeg";

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", async (req, res, next) => {
  const analysis = req.body;
  console.log("analysis/ analysis", analysis);

  const areaInfo = analysis.area;
  console.log("analysis/ areaInfo", areaInfo);

  // 여기
  const YoloResult = (callback) => {
    const options = {
      method: "GET",
      uri: "http://localhost:5000/deepsort",
      qs: {
        // userId: analysis.userId,
        filePath: analysis.videoPath,
        date: analysis.date,
        // time: analysis.time,
        area: analysis.area,
      },
    };

    request(options, (err, res, body) => {
      callback(undefined, { result: body });
    });
  };

  // const report = {};
  YoloResult((err, { result } = {}) => {
    if (err) {
      console.log("error!!!");
    }
    console.log(`result: ${result}!!!`);

    // report = result;
    res.json({success: true})
  });
  res.json({success: true})

  // if (report) {
  //   await REPORT.create(report);
  // }

  // 여기에 파이썬 데이터들 받아서 넘겨줘야함.
  // res.json(report);
  // res.json({success: true})
});

router.post("/video", multerUpload.single("file"), async (req, res, next) => {
  // console.log("req: ", req);
  // console.log("비디오패치에 넘겨온 req.file: ", req.file);
  // console.log("비디오패치에 넘겨온 req.body: ", req.body);

  // console.log("폼에 정의된 필드명 : ", reqFile.fieldname);
  // console.log("사용자가 업로드한 파일 명 : ", reqFile.originalname);
  // console.log("파일의 엔코딩 타입 : ", reqFile.encoding);
  // console.log("파일의 Mime 타입 : ", reqFile.mimetype);
  // console.log("파일이 저장된 폴더 : ", reqFile.destination);
  // console.log("destinatin에 저장된 파일 명 : ", reqFile.filename);
  // console.log("업로드된 파일의 전체 경로 ", reqFile.path);
  // console.log("파일의 바이트(byte 사이즈)", reqFile.size);

  console.log("analysis/video 비디오 저장완료");
  res.json({ videoPath: req.file.path });
});

router.post("/thumbnail", (req, res) => {
  console.log("analysis/thumbnail req.body: ", req.body);
  //썸네일 생성 하고 비디오 러닝타임도 가져오는 api

  let fileDuration = "";
  let filePath = "";
  //비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.videoPath, function (err, metadata) {
    //url을 받으면 해당 비디오에대한 정보가 metadata에담김
    // console.log(metadata); //metadata안에담기는 모든정보들 체킹
    // fileDuration = metadata.format.duration; //동영상길이대입
  });
  //썸네일 생성
  ffmpeg(req.body.videoPath) //클라이언트에서보낸 비디오저장경로
    .on("filenames", function (filenames) {
      //해당 url에있는 동영상을 밑에 스크린샷옵션을 기반으로
      //캡처한후 filenames라는 이름에 파일이름들을 저장
      console.log("will generate " + filenames.join(","));
      console.log("filenames:", filenames);

      // static 접근을 위해 uploads/thumbnails/  -> thumbnails/로 변경
      filePath = "thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        url: filePath,
      });
    })
    .on("error", function (err) {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      //Will take screenshots at 20% 40% 60% and 80% of the video
      count: 1,
      folder: "uploads/thumbnails",
      size: "320x180",
      //'%b':input basename(filename w/o extension) = 확장자제외파일명
      filename: "thumbnail_%b.png",
    });
});

export default router;

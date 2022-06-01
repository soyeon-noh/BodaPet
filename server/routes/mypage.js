import express from "express";
import { ChildProcess } from "child_process";

const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  // 1. child-process모듈의 spawn 취득
  const { spawn } = ChildProcess;
  // 2. spawn을 통해 "python 파이썬파일.py" 명령어 실행
  const result = spawn("python", ["./test/test.py", "강낭콩"]);
  // 3. stdout의 'data'이벤트리스너로 실행결과를 받는다.
  result.stdout.on("data", function (data) {
    console.log("python code 실행결과", data.toString());
    res.json(data.toString());
  });
  console.log("여기?3");
  result.stderr.on("data", function (data) {
    console.log("pythos code 에러발생", data.toString());
    res.json(data.toString());
  });
  const 결과 = {
    success: 1,
    message: "완료",
  };
  res.json(결과);
});

export default router;

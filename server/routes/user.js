import express from "express";
import * as userDetails from "../passport/userDetails.js";
import USER from "../models/user.js";

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/info/:user_id", async (req, res, next) => {});

router.get("/check", async (req, res, next) => {});

router.post("/login", async (req, res, next) => {
  const body = req.body;
  const user = await USER.find({ userId: body.userId });

  const userInfo = user[0];

  if (userInfo.userId == body.userId && userInfo.password == body.password) {
    console.log("로그인 성공", userInfo);
    res.json({ userId: userInfo.userId });
  } else res.json(false);
});

router.post("/signup", async (req, res, next) => {
  // console.log("회원가입 req.body", req.body);
  const body = req.body;
  await USER.create(body);
  res.json({ success: true });
});

router.post("/logout", async (req, res, next) => {});
// router.get("/info/:user_id", userDetails.userInfo);
// router.get("/check", userDetails.userCheck);

// router.post("/login", userDetails.login);
// router.post("/signup", userDetails.signup);
// router.post("/logout", userDetails.logout);

export default router;

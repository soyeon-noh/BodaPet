import express from "express";
import * as userDetails from "../passport/userDetails.js";

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/info/:user_id", userDetails.userInfo);
router.get("/check", userDetails.userCheck);

router.post("/login", userDetails.login);
router.post("/signup", userDetails.signup);
router.post("/logout", userDetails.logout);

export default router;

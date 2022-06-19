import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import reportRouter from "./routes/report.js";
import mypageRouter from "./routes/mypage.js";
import analysisRouter from "./routes/analysis.js";

import mongoose from "mongoose";
import dotenv from "dotenv";

import session from "express-session";
import passport from "passport";
import { Module } from "module";

const app = express();

// cors 설정
const whiteURL = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    const isWhiteURL = whiteURL.indexOf(origin) !== -1;
    callback(null, isWhiteURL);
  },
  credentials: true,
};
app.use(cors(corsOptions));

// 413 error 로 인한 body-parser 설정
// https://stackoverflow.com/questions/19917401/error-request-entity-too-large
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

// 정적 파일 다루기 위한 설정
// uploads/{나머지 파일경로}
// = localhost:5050/{나머지 파일경로}
app.use(express.static("uploads"));

// uploads 폴더에 접근
app.use("/mypage/voide", express.static("detect_upload"));
app.use("/mypage", express.static("detect_upload"));

// Disable the fingerprinting of this web technology. 경고
app.disable("x-powered-by");

// view engine setup
app.set("views", path.join("./views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("./public")));

// mongoose 설정
const dbConn = mongoose.connection;
dbConn.once("open", () => {
  console.log("˚✧₊⁎˳⁺MongoDB Open˳⁎⁺✧");
});
dbConn.on("error", () => {
  console.error;
});

dotenv.config(path.join("./.env"));
mongoose.connect(process.env.NODEJS_APP_MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Session 설정
const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    key: "bodapet",
    secret: process.env["SESSION_SECRET"], // .env
    cookie: { secure: false, httpOnly: false, maxAge: oneDay },
    // 세션을 (변경되지 않아도) 언제나 저장할 것인가? false 권장
    resave: false,
    saveUninitialized: true,
  })
);

// Passport 세팅
// localStrategy
Module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  // Serialize : 로그인 성공시 호출
  passport.serializeUser((user, done) => {
    // session에 사용자 정보가 저장, 두번째 인자 user가 deserializeUser로 전달
    done(null, user);
  });
  // Deserialize : 서버에 요청이 있을 때마다 호출
  passport.deserializeUser((user, done) => {
    // req.user로 user의 값을 접근할 수 있게 된다.
    done(null, user);
  });
};

// Router 설정
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/report", reportRouter);
app.use("/mypage", mypageRouter);
app.use("/analysis", analysisRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;

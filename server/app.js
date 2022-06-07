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

import mongoose from "mongoose";
import dotenv from "dotenv";

import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

const app = express();

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

// cors 설정
const whiteURL = ["http://localhost:3000"];
const corsOption = {
  origin: (origin, callback) => {
    const isWhiteURL = whiteURL.indexOf(origin) !== -1;
    callback(null, isWhiteURL);
  },
  credentials: true,
};
app.use(cors(corsOption));

// Session 설정
const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    key: "wit",
    secret: process.env["SESSION_SECRET"], // .env
    cookie: { secure: false, httpOnly: false, maxAge: oneDay },
    // 세션을 (변경되지 않아도) 언제나 저장할 것인가? false 권장
    resave: false,
    saveUninitialized: true,
  })
);

// Router 설정
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/report", reportRouter);
app.use("/mypage", mypageRouter);

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

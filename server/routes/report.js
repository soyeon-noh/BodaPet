import express from "express";
import REPORT from "../models/report.js";
const router = express.Router();

/* GET users listing. */

router.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  const report = await REPORT.findOne({ id: id });
  console.log("get /report id_report", report);

  res.json(report);
});

router.get("/date/:date/user/:user", async (req, res, next) => {
  const { date, user } = req.params;

  const report = await REPORT.find({ date: date, userId: user });

  console.log("get /report day_report", report);

  const reportTimeList = [];
  report.forEach((data) => {
    reportTimeList.push({ id: data.id, time: data.time, date: data.date });
  });
  console.log("report.js reportTimeList: ", reportTimeList);
  res.json(reportTimeList);
});

router.get("/date/:date/user/:user/time/:time", async (req, res, next) => {
  const { date, user, time } = req.params;

  const report = await REPORT.find({ date: date, userId: user, time });

  console.log("get /report time_report", report);
  res.json(report);
});

export default router;

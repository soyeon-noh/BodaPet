import express from "express";
import REPORT from "../models/report.js";
const router = express.Router();

/* GET users listing. */

router.get("/date/:date/user/:user", async (req, res, next) => {
  const { date, user } = req.params;

  const report = await REPORT.findOne({ date: date, userId: user });
  res.json(report);
});

// router.get("/:date/:user", async (req, res, next) => {
//   const { date } = req.params;

//   const report = await REPORT.findOne({ date: date });
//   res.json({report});
// });

// router.get("/date/:date/user/:user", async (req, res, next) => {
//   const { date, user } = req.params;

//   const reportList = await REPORT.find({ userId: user, date: date });
//   const dateList = reportList.map((report) => report.date);
//   res.json({ dateList });
// });

export default router;

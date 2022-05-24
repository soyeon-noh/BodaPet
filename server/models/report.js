import mongoose from "mongoose";

const ReportSchema = mongoose.Schema(
  {
    date: String,
    activity: String,
    area: {
      name: String,
      value: String,
    },
    video: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("report", ReportSchema);

import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

const ReportSchema = mongoose.Schema(
  {
    id: { type: Number, default: 0 },
    userId: { type: String },

    date: { type: String },
    // createdTime: { type: String },
    move_time: [],
    visit_time: [],

    // videoPath: { type: String },

    heatmap: { type: String },
    scatter: { type: String },
  },
  { timestamps: true }
);

ReportSchema.plugin(autoIncrement.plugin, {
  model: "ReportModel",
  field: "id",
  startAt: 1,
  increment: 1,
});

export default mongoose.model("report", ReportSchema);

import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

const ReportSchema = mongoose.Schema(
  {
    id: { type: Number, default: 0 },
    userId: { type: String },
    petId: { type: String },
    createdDate: { type: String },
    createdTime: { type: String },
    activity: { type: String },

    video_path: { type: String },
    heatmap_path: { type: String },

    area: [
      {
        name: { type: String },
        value: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

ReportSchema.plugin(autoIncrement.plugin, {
  model: "ReportModel",
  field: "id",
  startAt: 1,
  increment: 1,
});

module.exports = mongoose.model("report", ReportSchema);

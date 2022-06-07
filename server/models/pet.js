import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;

const petSchema = new Schema({
  id: { type: Number, default: 0 },
  userId: { type: String },
  name: { type: String },
  video_path: { type: String },
});

petSchema.plugin(autoIncrement.plugin, {
  model: "petModel",
  field: "id",
  startAt: 1,
  increment: 1,
});
export default mongoose.model("user", petSchema);

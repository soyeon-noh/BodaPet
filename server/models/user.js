import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Number, default: 0 },
  userId: { type: String, trim: true }, // 사용자가 작성한 아이디
  password: { type: String, trim: true }, // 사용자 비밀번호
  email: { type: String }, // 사용자 email
});

userSchema.plugin(autoIncrement.plugin, {
  model: "userModel",
  field: "id",
  startAt: 1,
  increment: 1,
});

export default mongoose.model("user", userSchema);

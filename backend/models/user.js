import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
});
export default mongoose.model("User", userSchema);

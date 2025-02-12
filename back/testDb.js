import mongoose from "mongoose";
import User from "./models/User.js";

await mongoose.connect("mongodb://127.0.0.1:27017/users");

const user = await User.findOne({ email: "test@example.com" });
console.log(user);

await mongoose.disconnect();

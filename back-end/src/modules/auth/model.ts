import mongoose from "mongoose";
export const User = mongoose.model("User", new mongoose.Schema({
  email:String,
  password:String,
  role:{type:String,default:"user"}
}));

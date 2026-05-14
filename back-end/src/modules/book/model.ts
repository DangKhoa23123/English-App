import mongoose from "mongoose";
export const Book = mongoose.model("Book", new mongoose.Schema({
  title:String,author:String,price:Number,stock:Number,
  description:String,image:String,category:String
},{timestamps:true}));

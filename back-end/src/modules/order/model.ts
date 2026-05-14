import mongoose from "mongoose";
export const Order = mongoose.model("Order", new mongoose.Schema({
  userId:mongoose.Types.ObjectId,
  items:[{
    bookId:mongoose.Types.ObjectId,
    title:String,price:Number,quantity:Number
  }],
  totalPrice:Number,
  status:{type:String,default:"pending"}
},{timestamps:true}));

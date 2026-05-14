import mongoose from "mongoose";
export const Cart = mongoose.model("Cart", new mongoose.Schema({
  userId:mongoose.Types.ObjectId,
  items:[{bookId:mongoose.Types.ObjectId,quantity:Number}]
}));

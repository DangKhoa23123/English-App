import express from "express";
import { auth } from "../../middlewares/auth";
import { Cart } from "../cart/model";
import { Book } from "../book/model";
import { Order } from "./model";

const r = express.Router();

r.post("/", auth, async (req:any,res)=>{
  const cart:any = await Cart.findOne({userId:req.user.id});
  if(!cart) return res.status(400).json({msg:"empty"});

  let total=0; const items=[];

  for(const i of cart.items){
    const b:any=await Book.findById(i.bookId);
    if(!b || b.stock<i.quantity) return res.status(400).json({msg:"stock"});
    b.stock-=i.quantity; await b.save();

    items.push({bookId:b._id,title:b.title,price:b.price,quantity:i.quantity});
    total+=b.price*i.quantity;
  }

  const order=await Order.create({userId:req.user.id,items,totalPrice:total});
  await Cart.deleteOne({userId:req.user.id});
  res.json(order);
});

export default r;

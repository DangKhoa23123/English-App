import express from "express";
import { Cart } from "./model";
import { auth } from "../../middlewares/auth";

const r = express.Router();

r.post("/add", auth, async (req:any,res)=>{
  let cart=await Cart.findOne({userId:req.user.id});
  if(!cart){
    cart=await Cart.create({userId:req.user.id,items:[req.body]});
  }else{
    const i=cart.items.find(x=>x.bookId==req.body.bookId);
    if(i) i.quantity+=req.body.quantity;
    else cart.items.push(req.body);
    await cart.save();
  }
  res.json(cart);
});

export default r;

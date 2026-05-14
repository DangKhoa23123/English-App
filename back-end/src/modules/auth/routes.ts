import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./model";

const r = express.Router();

r.post("/register", async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);
  const u = await User.create({...req.body,password:hash});
  res.json(u);
});

r.post("/login", async (req,res)=>{
  const u:any = await User.findOne({email:req.body.email});
  if(!u) return res.status(400).json({msg:"Not found"});
  const ok = await bcrypt.compare(req.body.password,u.password);
  if(!ok) return res.status(400).json({msg:"Wrong"});
  const token = jwt.sign({id:u._id,role:u.role},process.env.JWT_SECRET!);
  res.json({token});
});

export default r;

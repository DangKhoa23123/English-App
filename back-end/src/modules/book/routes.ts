import express from "express";
import { Book } from "./model";

const r = express.Router();

r.get("/", async (req:any,res)=>{
  const {search="",page=1,limit=10}=req.query;
  const q={title:{$regex:search,$options:"i"}};
  const data=await Book.find(q)
    .skip((page-1)*limit)
    .limit(Number(limit));
  res.json(data);
});

r.post("/", async (req,res)=>{
  res.json(await Book.create(req.body));
});

export default r;

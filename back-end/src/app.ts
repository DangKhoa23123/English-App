import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./modules/auth/routes";
import bookRoutes from "./modules/book/routes";
import cartRoutes from "./modules/cart/routes";
import orderRoutes from "./modules/order/routes";

dotenv.config();

mongoose.connect(process.env.MONGO_URI!)
.then(()=>console.log("DB connected"));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.listen(3000, ()=>console.log("Server running"));

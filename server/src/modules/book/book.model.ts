import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  stock: number;
  description?: string;
  image?: string;
  category?: string;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    description: String,
    image: String,
    category: String,
  },
  { timestamps: true }
);

export const Book = mongoose.model<IBook>("Book", bookSchema);

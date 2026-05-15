import { Router } from "express";
import { AuthRequest, auth } from "../../middlewares/auth";
import { Book } from "../book/book.model";
import { Cart } from "../cart/cart.model";
import { Order } from "./order.model";

const router = Router();

router.use(auth);

router.get("/", async (req: AuthRequest, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user!.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req: AuthRequest, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user!.id,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req: AuthRequest, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user!.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const book = await Book.findById(item.bookId);
      if (!book) {
        return res.status(400).json({ message: "Book no longer available" });
      }
      if (book.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${book.title}` });
      }

      book.stock -= item.quantity;
      await book.save();

      orderItems.push({
        bookId: book._id,
        title: book.title,
        price: book.price,
        quantity: item.quantity,
      });
      total += book.price * item.quantity;
    }

    const order = await Order.create({
      userId: req.user!.id,
      items: orderItems,
      totalPrice: total,
      status: "completed",
    });

    await Cart.deleteOne({ userId: req.user!.id });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

export default router;

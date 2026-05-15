import { Router } from "express";
import { AuthRequest, auth } from "../../middlewares/auth";
import { Book } from "../book/book.model";
import { Cart } from "./cart.model";

const router = Router();

router.use(auth);

router.get("/", async (req: AuthRequest, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user!.id }).populate(
      "items.bookId"
    );
    res.json(cart || { userId: req.user!.id, items: [] });
  } catch (err) {
    next(err);
  }
});

router.post("/add", async (req: AuthRequest, res, next) => {
  try {
    const { bookId, quantity = 1 } = req.body;
    if (!bookId) {
      return res.status(400).json({ message: "bookId required" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let cart = await Cart.findOne({ userId: req.user!.id });
    if (!cart) {
      cart = await Cart.create({
        userId: req.user!.id,
        items: [{ bookId, quantity }],
      });
    } else {
      const existing = cart.items.find(
        (item) => item.bookId.toString() === bookId
      );
      if (existing) {
        existing.quantity += Number(quantity);
      } else {
        cart.items.push({ bookId, quantity: Number(quantity) });
      }
      await cart.save();
    }

    const populated = await Cart.findById(cart._id).populate("items.bookId");
    res.json(populated);
  } catch (err) {
    next(err);
  }
});

router.patch("/items", async (req: AuthRequest, res, next) => {
  try {
    const { bookId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user!.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((i) => i.bookId.toString() === bookId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.bookId.toString() !== bookId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    const populated = await Cart.findById(cart._id).populate("items.bookId");
    res.json(populated);
  } catch (err) {
    next(err);
  }
});

router.delete("/items/:bookId", async (req: AuthRequest, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user!.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (i) => i.bookId.toString() !== req.params.bookId
    );
    await cart.save();

    const populated = await Cart.findById(cart._id).populate("items.bookId");
    res.json(populated);
  } catch (err) {
    next(err);
  }
});

export default router;

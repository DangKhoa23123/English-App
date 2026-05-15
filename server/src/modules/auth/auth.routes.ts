import { Router } from "express";
import { loginUser, registerUser } from "./auth.service";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const user = await registerUser({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed";
    res.status(400).json({ message });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const result = await loginUser(email, password);
    res.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed";
    res.status(400).json({ message });
  }
});

export default router;

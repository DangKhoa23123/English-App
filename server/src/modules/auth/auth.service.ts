import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { User } from "./auth.model";

export async function registerUser(data: {
  email: string;
  password: string;
  role?: string;
}) {
  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw new Error("Email already registered");
  }

  const hash = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    email: data.email,
    password: hash,
    role: data.role === "admin" ? "admin" : "user",
  });

  return {
    id: user._id,
    email: user.email,
    role: user.role,
  };
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id.toString(), role: user.role },
    env.jwtSecret,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: { id: user._id, email: user.email, role: user.role },
  };
}

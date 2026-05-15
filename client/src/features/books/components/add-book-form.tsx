"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { booksApi } from "../api/books-api";
import { ApiError } from "@/lib/api-client";

export function AddBookForm() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    category: "",
  });

  if (user?.role !== "admin") {
    return (
      <p className="py-12 text-center text-muted-foreground">
        Admin access required.
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    setError("");
    setLoading(true);

    try {
      await booksApi.create(
        {
          title: form.title,
          author: form.author,
          price: Number(form.price),
          stock: Number(form.stock),
          description: form.description || undefined,
          image: form.image || undefined,
          category: form.category || undefined,
        },
        token
      );
      router.push("/");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create book");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4">
      <h1 className="text-2xl font-bold">Add new book</h1>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <Input
        placeholder="Author"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
        required
      />
      <Input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
        min={0}
        step="0.01"
      />
      <Input
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
        required
        min={0}
      />
      <Input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <Input
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="min-h-24 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Create book"}
      </Button>
    </form>
  );
}

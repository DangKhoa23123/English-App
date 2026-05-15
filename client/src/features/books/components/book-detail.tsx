"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useAddToCart } from "@/features/cart/hooks/use-cart";
import { useBook } from "../hooks/use-books";

export function BookDetail({ id }: { id: string }) {
  const router = useRouter();
  const { data: book, isLoading, isError } = useBook(id);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const addToCart = useAddToCart();

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-xl bg-muted" />;
  }

  if (isError || !book) {
    return <p className="text-muted-foreground">Book not found.</p>;
  }

  const imageUrl =
    book.image || `https://picsum.photos/seed/${book._id}/800/600`;

  function handleAddToCart() {
    if (!book) return;
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }
    addToCart.mutate({ bookId: book._id, quantity: 1 });
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={book.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">{book.category}</p>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-lg text-muted-foreground">by {book.author}</p>
        </div>
        <p className="text-2xl font-semibold">${book.price.toFixed(2)}</p>
        {book.description && (
          <p className="leading-relaxed text-muted-foreground">
            {book.description}
          </p>
        )}
        <p className="text-sm">
          {book.stock > 0 ? (
            <span className="text-green-600">{book.stock} in stock</span>
          ) : (
            <span className="text-rose-500">Out of stock</span>
          )}
        </p>
        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={book.stock === 0 || addToCart.isPending}
        >
          {addToCart.isPending ? "Adding..." : "Add to cart"}
        </Button>
        {addToCart.isSuccess && (
          <p className="text-sm text-green-600">Added to cart!</p>
        )}
      </div>
    </div>
  );
}

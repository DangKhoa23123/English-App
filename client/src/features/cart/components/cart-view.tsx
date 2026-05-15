"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useCheckout } from "@/features/orders/hooks/use-orders";
import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from "../hooks/use-cart";
import type { Book } from "@/types";

function getBook(item: { bookId: Book | string }): Book | null {
  return typeof item.bookId === "object" ? item.bookId : null;
}

export function CartView() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: cart, isLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const checkout = useCheckout();

  if (!isAuthenticated()) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-muted-foreground">Please log in to view your cart.</p>
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="h-48 animate-pulse rounded-xl bg-muted" />;
  }

  const items = cart?.items ?? [];

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-muted-foreground">Your cart is empty.</p>
        <Button asChild variant="outline">
          <Link href="/">Browse books</Link>
        </Button>
      </div>
    );
  }

  let total = 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your cart</h1>
      <div className="divide-y rounded-xl border">
        {items.map((item) => {
          const book = getBook(item);
          if (!book) return null;
          const lineTotal = book.price * item.quantity;
          total += lineTotal;
          const imageUrl =
            book.image || `https://picsum.photos/seed/${book._id}/200/150`;

          return (
            <div
              key={book._id}
              className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg">
                <Image src={imageUrl} alt={book.title} fill className="object-cover" unoptimized />
              </div>
              <div className="flex-1">
                <Link href={`/books/${book._id}`} className="font-semibold hover:underline">
                  {book.title}
                </Link>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <p className="font-medium">${book.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() =>
                    updateItem.mutate({
                      bookId: book._id,
                      quantity: Math.max(1, item.quantity - 1),
                    })
                  }
                >
                  -
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() =>
                    updateItem.mutate({
                      bookId: book._id,
                      quantity: item.quantity + 1,
                    })
                  }
                >
                  +
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem.mutate(book._id)}
                >
                  Remove
                </Button>
              </div>
              <p className="font-semibold sm:w-24 sm:text-right">
                ${lineTotal.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-end gap-4 border-t pt-4">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <Button
          size="lg"
          disabled={checkout.isPending}
          onClick={() =>
            checkout.mutate(undefined, {
              onSuccess: () => router.push("/orders"),
            })
          }
        >
          {checkout.isPending ? "Processing..." : "Checkout"}
        </Button>
        {checkout.isError && (
          <p className="text-sm text-destructive">Checkout failed. Try again.</p>
        )}
      </div>
    </div>
  );
}

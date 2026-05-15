"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useOrders } from "../hooks/use-orders";

export function OrdersList() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: orders, isLoading } = useOrders();

  if (!isAuthenticated()) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-muted-foreground">Please log in to view orders.</p>
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="h-48 animate-pulse rounded-xl bg-muted" />;
  }

  if (!orders?.length) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-muted-foreground">No orders yet.</p>
        <Button asChild variant="outline">
          <Link href="/">Browse books</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Your orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="rounded-xl border p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium">
              Order #{order._id.slice(-6).toUpperCase()}
            </p>
            <span className="rounded-full bg-muted px-3 py-1 text-xs capitalize">
              {order.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.title} × {item.quantity} — $
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-3 font-semibold">
            Total: ${order.totalPrice.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}

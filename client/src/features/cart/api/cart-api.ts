import { apiClient } from "@/lib/api-client";
import type { Cart } from "@/types";

export const cartApi = {
  get: (token: string) => apiClient<Cart>("/cart", { token }),

  add: (data: { bookId: string; quantity?: number }, token: string) =>
    apiClient<Cart>("/cart/add", {
      method: "POST",
      body: JSON.stringify(data),
      token,
    }),

  updateItem: (data: { bookId: string; quantity: number }, token: string) =>
    apiClient<Cart>("/cart/items", {
      method: "PATCH",
      body: JSON.stringify(data),
      token,
    }),

  removeItem: (bookId: string, token: string) =>
    apiClient<Cart>(`/cart/items/${bookId}`, {
      method: "DELETE",
      token,
    }),
};

import { apiClient } from "@/lib/api-client";
import type { Order } from "@/types";

export const ordersApi = {
  list: (token: string) => apiClient<Order[]>("/orders", { token }),

  getById: (id: string, token: string) =>
    apiClient<Order>(`/orders/${id}`, { token }),

  checkout: (token: string) =>
    apiClient<Order>("/orders", {
      method: "POST",
      token,
    }),
};

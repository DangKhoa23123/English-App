"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { ordersApi } from "../api/orders-api";

export function useOrders() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["orders", token],
    queryFn: () => ordersApi.list(token!),
    enabled: Boolean(token),
  });
}

export function useCheckout() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => ordersApi.checkout(token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { cartApi } from "../api/cart-api";

export function useCart() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["cart", token],
    queryFn: () => cartApi.get(token!),
    enabled: Boolean(token),
  });
}

export function useAddToCart() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { bookId: string; quantity?: number }) =>
      cartApi.add(data, token!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useUpdateCartItem() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { bookId: string; quantity: number }) =>
      cartApi.updateItem(data, token!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useRemoveCartItem() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => cartApi.removeItem(bookId, token!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}

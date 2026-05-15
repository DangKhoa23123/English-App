"use client";

import { useQuery } from "@tanstack/react-query";
import { booksApi } from "../api/books-api";

export function useBooks(params: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => booksApi.list(params),
  });
}

export function useBook(id: string) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => booksApi.getById(id),
    enabled: Boolean(id),
  });
}

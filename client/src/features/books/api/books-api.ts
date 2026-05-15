import { apiClient } from "@/lib/api-client";
import type { Book, BooksResponse } from "@/types";

export const booksApi = {
  list: (params: { search?: string; category?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    if (params.category) query.set("category", params.category);
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    return apiClient<BooksResponse>(`/books${qs ? `?${qs}` : ""}`);
  },

  getById: (id: string) => apiClient<Book>(`/books/${id}`),

  create: (data: Partial<Book>, token: string) =>
    apiClient<Book>("/books", {
      method: "POST",
      body: JSON.stringify(data),
      token,
    }),
};

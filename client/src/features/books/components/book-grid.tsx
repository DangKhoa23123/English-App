"use client";

import { BookCard } from "./book-card";
import { useBooks } from "../hooks/use-books";
import { useSearchStore } from "@/features/search/store/search-store";

export function BookGrid() {
  const search = useSearchStore((s) => s.search);
  const category = useSearchStore((s) => s.category);
  const { data, isLoading, isError } = useBooks({
    search,
    category,
    page: 1,
    limit: 24,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] animate-pulse rounded-xl bg-muted"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        Could not load books. Make sure the API server is running.
      </p>
    );
  }

  const books = data?.data ?? [];

  if (books.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">No books found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}

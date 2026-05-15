import { BookGrid } from "@/features/books/components/book-grid";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold sm:text-4xl">Discover Books</h1>
      <BookGrid />
    </div>
  );
}

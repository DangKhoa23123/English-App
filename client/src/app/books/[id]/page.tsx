import { BookDetail } from "@/features/books/components/book-detail";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <BookDetail id={id} />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Book } from "@/types";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const imageUrl =
    book.image || `https://picsum.photos/seed/${book._id}/400/300`;

  return (
    <Link href={`/books/${book._id}`} className="group">
      <Card className="overflow-hidden border-0 shadow-none ring-0 transition hover:shadow-lg">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            alt={book.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            unoptimized
          />
        </div>
        <CardContent className="px-0 pt-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold leading-tight">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </div>
          </div>
          {book.category && (
            <p className="mt-1 text-xs text-muted-foreground">{book.category}</p>
          )}
        </CardContent>
        <CardFooter className="border-0 bg-transparent px-0 pt-0">
          <p className="font-semibold">
            <span className="font-normal">$</span>
            {book.price.toFixed(2)}
          </p>
          {book.stock <= 3 && book.stock > 0 && (
            <span className="ml-auto text-xs text-rose-500">
              Only {book.stock} left
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}

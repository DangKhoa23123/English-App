import { connectDb } from "../config/db";
import { Book } from "../modules/book/book.model";

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    stock: 20,
    category: "Fiction",
    description: "A classic American novel set in the Jazz Age.",
    image: "https://picsum.photos/seed/gatsby/400/300",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 14.5,
    stock: 15,
    category: "Fiction",
    description: "A gripping tale of racial injustice and childhood innocence.",
    image: "https://picsum.photos/seed/mockingbird/400/300",
  },
  {
    title: "1984",
    author: "George Orwell",
    price: 11.99,
    stock: 25,
    category: "Science Fiction",
    description: "A dystopian social science fiction novel.",
    image: "https://picsum.photos/seed/1984/400/300",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 9.99,
    stock: 18,
    category: "Romance",
    description: "A romantic novel of manners.",
    image: "https://picsum.photos/seed/pride/400/300",
  },
];

async function seed() {
  await connectDb();
  await Book.deleteMany({});
  await Book.insertMany(sampleBooks);
  console.log(`Seeded ${sampleBooks.length} books`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

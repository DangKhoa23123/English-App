export interface User {
  id: string;
  email: string;
  role: "user" | "admin";
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  stock: number;
  description?: string;
  image?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BooksResponse {
  data: Book[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CartItem {
  bookId: Book | string;
  quantity: number;
}

export interface Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
}

export interface OrderItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

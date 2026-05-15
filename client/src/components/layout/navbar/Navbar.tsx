"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useSearchStore } from "@/features/search/store/search-store";
import { useCart } from "@/features/cart/hooks/use-cart";

export default function Navbar() {
  const router = useRouter();
  const { search, category, setSearch, setCategory } = useSearchStore();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: cart } = useCart();

  const cartCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/");
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">

        <Link href="/" className="shrink-0">
          <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-7 -rotate-90 sm:size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            <span className="hidden sm:inline">airbnb</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden flex-1 items-center rounded-full border shadow-sm transition hover:shadow-md md:flex max-w-xl mx-4"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books"
            className="flex-1 px-6 py-3 text-sm font-medium outline-none rounded-l-full"
          />
          <div className="h-6 w-px bg-gray-300" />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-28 px-4 py-3 text-sm font-medium outline-none"
          />
          <div className="h-6 w-px bg-gray-300" />
          <button
            type="submit"
            className="flex items-center gap-3 px-6 py-3 text-sm font-medium"
          >
            <span className="hidden lg:inline text-muted-foreground">Search</span>
            <div className="rounded-full bg-rose-500 p-2 text-white">
              <Search size={14} />
            </div>
          </button>
        </form>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            className="relative flex items-center rounded-full border p-3 shadow-sm transition hover:shadow-md"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-2 rounded-full border p-2 shadow-sm transition hover:shadow-md sm:p-3">
            <Menu size={18} className="hidden sm:block" />

            {isAuthenticated() ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/orders"
                  className="hidden text-sm font-medium sm:inline hover:underline"
                >
                  Orders
                </Link>
                {user?.role === "admin" && (
                  <Link
                    href="/admin/books/new"
                    className="hidden text-sm font-medium sm:inline hover:underline"
                  >
                    Add book
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="rounded-full bg-gray-500 px-3 py-1 text-xs text-white sm:text-sm"
                >
                  {user?.email?.split("@")[0] ?? "Account"}
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-gray-500 p-1 text-white"
                aria-label="Login"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center gap-2 border-t px-4 py-2 md:hidden"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books..."
          className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-rose-500 p-2 text-white"
        >
          <Search size={16} />
        </button>
      </form>
    </header>
  );
}

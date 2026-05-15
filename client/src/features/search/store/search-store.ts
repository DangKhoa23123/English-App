import { create } from "zustand";

interface SearchState {
  search: string;
  category: string;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  search: "",
  category: "",
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
}));

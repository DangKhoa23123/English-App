import { apiClient } from "@/lib/api-client";
import type { AuthResponse, User } from "@/types";

export const authApi = {
  register: (data: { email: string; password: string }) =>
    apiClient<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import axios, { AxiosError } from 'axios';
import { AuthTokenError } from "@/errors/AuthTokenError";
import { signOut } from "@/contexts/AuthContext";

export function setupAPIClient(ctx?: string) {
  let cookies;
  if (ctx !== undefined) {
    cookies = parseCookie(ctx);
  }

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: cookies ? `Bearer ${cookies.get('@nextauth.token')}` : ''
    }
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) { // Verifique se error.response existe antes de acessá-lo
        if (typeof window !== 'undefined') {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
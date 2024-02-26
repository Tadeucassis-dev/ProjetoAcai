import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import axios, { AxiosError } from 'axios';
import { AuthTokenError } from "@/errors/AuthTokenError";
import { signOut } from "@/contexts/AuthContext";

export function setupAPIClient(ctx?: string) {
  let cookies;
  if (ctx !== undefined) {
    cookies = parseCookie(ctx);
  }
  console.log(cookies)

  const token = "token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGFkZXUgdGVzdGUiLCJlbWFpbCI6InRhZGV1Y2Fzc2lzQHRlc3RlIiwiaWF0IjoxNzA4NDM4NzM4LCJleHAiOjE3MTEwMzA3MzgsInN1YiI6ImI3NzljNWI2LTVmNzctNDk2Ni1iMGM3LTI1OTNlMjYzNDU1MCJ9.xGfj996B3Zh2bMriXmLFJ7s4D7C5sSa3_6Zz27M4_hs"

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: cookies ? `Bearer ${cookies.get('@nextauth.token')}` : token
    }
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) { 
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
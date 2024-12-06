import { Cookies } from "react-cookie";

// Sett cookies
export const setCookie = (name: string, value: string, days: number) => {
  const cookies = new Cookies();
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  cookies.set(name, value, { path: "/", expires });
};

// Hent cookies
export const getCookie = (name: string): string | null => {
  const cookies = new Cookies();
  return cookies.get(name) || null;
};

// Slett cookies
export const removeCookie = (name: string) => {
  const cookies = new Cookies();
  cookies.remove(name, { path: "/" });
};



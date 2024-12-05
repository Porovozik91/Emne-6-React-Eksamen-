// cookieManager.ts
import { useCookies } from 'react-cookie';

// For å sette cookies
export const useSetCookie = () => {
  const [, setCookie] = useCookies(); // Slettet default cookie-keys her

  const setUserCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    setCookie(name, value, { path: '/', expires });
  };

  return setUserCookie;
};

// For å hente cookies
export const useGetCookie = (name: string) => {
  const [cookies] = useCookies([name]);
  return cookies[name];  // Husk at 'cookies' inneholder dynamisk tilgang via nøkkel
};



import { jwtVerify } from "jose";

const jwtSecret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);

if (!jwtSecret) {
  throw new Error("mangler VITE_JWT_SECRET i .env");
}

const jwtDecoder = async (
  token: string | null
): Promise<{ 
  username: string | null; 
  role: string | null; 
  _uuid: string | null 
}> => { if (!token) return { username: null, role: null, _uuid: null };

  try {
    const { payload } = await jwtVerify(token, jwtSecret);

    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && currentTime > payload.exp) {
      console.warn("Tokenet er utløpt.");
      return { username: null, role: null, _uuid: null };
    }

    return {
      username: payload.username as string,
      role: payload.role as string,
      _uuid: payload._uuid as string,
    };
  } catch (error) {
    console.error("Feil ved dekoding av JWT:", error);
    return { username: null, role: null, _uuid: null };
  }
};

export default jwtDecoder;

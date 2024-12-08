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
  _uuid: string | null }> => {
  if (!token) return { 
    username: null, 
    role: null, 
    _uuid: null 
  };

  try {
    const { payload } = await jwtVerify(token, jwtSecret);
    return {
      username: payload.username as string,
      role: payload.role as string,
      _uuid: payload.uuid as string,
    };
  } catch (error) {
    console.error("Feil ved dekoding av JWT:", error);
    return { 
      username: null, 
      role: null, 
      _uuid: null 
    };
  }
};

export default jwtDecoder;
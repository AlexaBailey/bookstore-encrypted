import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (authToken) => {
  try {
    const decodedToken = jwtDecode(authToken);
    return decodedToken.userId;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

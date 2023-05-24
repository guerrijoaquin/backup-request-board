import { fetchContent } from "../utils/fetchContent";

export const authFunction = async (endpoint, user) => {
  const endpoints = ["login", "logout", "check-status", "signup"];

  if (!endpoints.includes(endpoint.toLowerCase()))
    throw new Error("Este endpoint no existe");

  const config = {
    method: "POST",
    body: { ...user },
  };
  try {
    await fetchContent(`auth/${endpoint.toLowerCase()}`, config);
  } catch (error) {
    throw new Error("Ha ocurrido un problema, ver server logs");
  }
};

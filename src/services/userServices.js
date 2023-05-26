import { fetchContent } from "../utils/fetchContent";

export const authFunction = async (endpoint, user) => {
  let endp = endpoint.toLowerCase();
  const endpoints = ["login", "logout", "check-status", "signup", "activate"];

  if (!endpoints.includes(endp)) throw new Error("Este endpoint no existe");

  const config = {
    method: endp === endpoints[2] ? "GET" : "POST",
    body: { ...user },
    withCredentials: true,
  };

  return await fetchContent(`auth/${endp}`, config);
};

import { useState } from "react";
import { authFunction } from "../services/userServices";

const useAuth = () => {
  const [data, setData] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authFunctions = async (endpoint, user = null, successful) => {
    try {
      setIsLoading(true);
      let res = await authFunction(endpoint, user);
      setIsLoading(false);
      setData(res);
      if (successful) successful();
      return res;
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Ocurrió un error");
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    errorMessage,
    isLoading,
    authFunctions,
    setErrorMessage,
    data,
  };
};

export default useAuth;

import { useState } from "react";
import { authFunction } from "../services/userServices";

const useAuth = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authFunctions = async (endpoint, user) => {
    setIsError(false);
    setIsLoading(true);
    try {
      let res = await authFunction(endpoint, user);
      setIsLoading(true);
      return res;
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  return {
    isError,
    isLoading,
    authFunctions,
  };
};

export default useAuth;

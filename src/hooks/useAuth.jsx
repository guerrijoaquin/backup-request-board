import { useState } from "react";
import { authFunction } from "../services/userServices";

const useAuth = () => {
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authFunctions = async (endpoint, user = null) => {
    setIsError(false);
    setIsLoading(true);
    try {
      let res = await authFunction(endpoint, user);
      setIsLoading(false);
      setData(res);
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
    data,
  };
};

export default useAuth;

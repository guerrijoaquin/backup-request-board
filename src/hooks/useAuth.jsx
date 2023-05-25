import { useState } from "react";
import { authFunction } from "../services/userServices";

const useAuth = () => {
  const [data, setData] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authFunctions = async (endpoint, user = null, successful) => {
    setIsLoading(true);
    
    try {
      let res = await authFunction(endpoint, user);
      setIsLoading(false);
      setData(res);
      successful()
    } catch (error) {
      console.log('Error bro');
      setErrorMessage(error?.response?.data?.message || 'Ocurrió un error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    errorMessage,
    isLoading,
    authFunctions,
    data
  };
};

export default useAuth;

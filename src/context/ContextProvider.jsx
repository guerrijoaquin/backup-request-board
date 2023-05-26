/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { fetchContent } from "../utils/fetchContent";
import useAuth from "../hooks/useAuth";

export const ActionContext = createContext();

const ContextProvider = ({ children }) => {
  const {isLoading, errorMessage, authFunctions} = useAuth()
  const [board, setBoard] = useState([]);
  const [functions, setFunctions] = useState();
  const [eventBus, setEventBus] = useState();
  const [user, setUser] = useState({
    isLogged: false,
  });

  const userLogin = (user) => {
    setUser({ ...user, isLogged: true });
  };

  const userLogout = async () => {
    
    await authFunctions('logout', null, () => setUser({ isLogged: false }))

    
  };

  return (
    <ActionContext.Provider
      value={{
        userLogin,
        userLogout,
        user,
        board,
        functions,
        setFunctions,
        setBoard,
        eventBus,
        setEventBus
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export default ContextProvider;

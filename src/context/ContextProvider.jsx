/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ActionContext = createContext();

const ContextProvider = ({ children }) => {
  const [board, setBoard] = useState([]);
  const [functions, setFunctions] = useState();
  const [user, setUser] = useState({
    isLogged: false,
  });

  const userLogin = (user) => {
    setUser({ ...user, isLogged: true });
  };

  const userLogout = () => {
    setUser({ isLogged: false });
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
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export default ContextProvider;

/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ActionContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLogged: false,
  });

  const userLogin = (data) => {
    setUser({
      ...data,
      isLogged: true,
    });
  };

  const userLogout = () => {
    setUser({ isLogged: false });
  };

  return (
    <ActionContext.Provider value={{ userLogin, userLogout, user }}>
      {children}
    </ActionContext.Provider>
  );
};

export default ContextProvider;

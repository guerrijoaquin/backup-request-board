/* eslint-disable react/prop-types */

import { useContext, useLayoutEffect } from "react";
import { ActionContext } from "../../context/ContextProvider";
import useAuth from "../../hooks/useAuth";
import { Box, Loader } from "@mantine/core";

const AuthChecker = ({ children }) => {
  const { userLogin, userLogout } = useContext(ActionContext);
  const { isLoading, authFunctions } = useAuth();

  useLayoutEffect(() => {
    const isAuthenticated = async () => {
      try {
        let data = await authFunctions("check-status");
        console.log("Data from check-status 1: " + JSON.stringify(data));
        userLogin(data);
      } catch (error) {
        userLogout();
      }
    };
    isAuthenticated();
  }, []);

  if (isLoading) {
    return (
      <Box
        w={"100%"}
        h={"100vh"}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Loader />
      </Box>
    );
  }

  return <>{children}</>;
};

export default AuthChecker;

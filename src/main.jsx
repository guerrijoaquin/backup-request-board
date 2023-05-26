import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import ContextProvider from "./context/ContextProvider.jsx";
import AuthChecker from "./components/auth/AuthChecker.jsx";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <Notifications />
    <ContextProvider>
      <AuthChecker>
        <App />
      </AuthChecker>
    </ContextProvider>
  </MantineProvider>
);

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import ContextProvider from "./context/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <ContextProvider>
      <App />
    </ContextProvider>
  </MantineProvider>
);

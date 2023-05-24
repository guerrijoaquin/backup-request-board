import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/login";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateAccount from "./components/login/creatAccount/CreateAccount";
import ForgotPassword from "./components/login/forgotPassword/ForgotPassword";
import { useContext } from "react";
import { ActionContext } from "./context/ContextProvider";

function App() {
  const { user } = useContext(ActionContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {user.isLogged && <Route path="/dashboard" element={<Dashboard />} />}
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { useContext } from "react";
import { ActionContext } from "./context/ContextProvider";

function App() {
  const { user } = useContext(ActionContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {user.isLogged && <Route path="/dashboard" element={<Dashboard />} />}
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

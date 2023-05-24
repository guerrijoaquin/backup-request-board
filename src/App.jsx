import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateAccount from "./components/login/creatAccount/CreateAccount";
import { useContext } from "react";
import { ActionContext } from "./context/ContextProvider";
import { NotFound } from "./pages/NotFound/NotFound";

function App() {
  const { user } = useContext(ActionContext);

  return (
    <Router>
      <Routes>
        {user.isLogged ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

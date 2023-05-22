import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, Drawer, Title } from "@mantine/core";
import CreateCardForm from "./components/CreateCardForm";
import { useDisclosure } from "@mantine/hooks";
import { CgAddR } from "react-icons/cg";
import BoardComponent from "./components/BoardComponent";
import Login from "./components/login/Login";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [opened, { open, close }] = useDisclosure(false);
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

function Dashboard() {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  return (
    <>
      <main>
        <Drawer opened={opened} onClose={close}>
          <CreateCardForm closeDrawer={close} />
        </Drawer>

        <Title
          order={1}
          color="indigo"
          size={"3rem"}
          sx={{ textAlign: "center", padding: "20px 0" }}
        >
          Request Board
        </Title>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <BoardComponent />
        </Box>
      </main>
      <Button
        color="indigo"
        rightIcon={<CgAddR size={"1.2rem"} />}
        title="Crear petición"
        sx={{ position: "fixed", bottom: "10px", right: "10px" }}
        onClick={open}
        size="md"
      >
        Crear petición
      </Button>
      <Button
        color="indigo"
        title="Cerrar sesión"
        sx={{ position: "fixed", top: "10px", right: "10px" }}
        onClick={() => navigate('/login')}
        size="md"
      >
        Cerrar sesión
      </Button>
    </>
  );
}

export default App;

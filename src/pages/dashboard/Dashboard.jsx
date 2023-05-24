import { Box, Button, Drawer, Title } from "@mantine/core";
import CreateCardForm from "../../components/CreateCardForm";
import { useDisclosure } from "@mantine/hooks";
import { CgAddR } from "react-icons/cg";
import BoardComponent from "./components/BoardComponent";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ActionContext } from "../../context/ContextProvider";

const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { userLogout } = useContext(ActionContext);

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
        onClick={() => {
          userLogout();
          navigate("/");
        }}
        size="md"
      >
        Cerrar sesión
      </Button>
    </>
  );
};

export default Dashboard;

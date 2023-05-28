import { Box, Button, Container, Drawer, Title } from "@mantine/core";
import CreateCardForm from "../../components/CreateCardForm";
import { useDisclosure } from "@mantine/hooks";
import { CgAddR } from "react-icons/cg";
import BoardComponent from "./components/BoardComponent";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ActionContext } from "../../context/ContextProvider";
import SearchCard from "../../components/SearchCard/SearchCard";
import AuthChecker from "../../components/auth/AuthChecker";

const Dashboard = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { userLogout } = useContext(ActionContext);

  return (
    <AuthChecker>
      <>
        <main>
          <Drawer opened={opened} onClose={close}>
            <CreateCardForm closeDrawer={close} />
          </Drawer>

          <Title
            order={1}
            color="indigo"
            size={"3rem"}
            sx={{ textAlign: "center", padding: "20px" }}
          >
            Request Board
          </Title>
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <SearchCard />
          </Container>

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
          onClick={async () => {
            await userLogout();
            navigate("/");
          }}
          size="md"
        >
          Cerrar sesión
        </Button>
      </>
    </AuthChecker>
  );
};

export default Dashboard;

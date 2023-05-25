import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import useAuth from "../../hooks/useAuth";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import { ActionContext } from "../../context/ContextProvider";

const Login = () => {
  const { errorMessage, isLoading, authFunctions } = useAuth();
  const { userLogin, userLogout } = useContext(ActionContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    form.validate();
    if (form.isValid()) {
      try {
        let data = await authFunctions("login", form.values);
        return userLogin(data);
      } catch (e) {
        userLogout();
        console.log(e, errorMessage);
      }
    }
    return form.reset();
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^[a-zA-Z0-9\._%+-]+@adviters\.com$/.test(value)
          ? null
          : "El email debe pertenecer a adviters",
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value)
          ? null
          : "La contraseña es débil",
    },
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        ¡Bienvenido de nuevo!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        ¿Aún no tienes una cuenta?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate("/create-account")}
        >
          Crear cuenta
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form onSubmit={handleLogin}>
          <TextInput
            label="Correo electrónico"
            placeholder="tucorreo@ejemplo.com"
            withAsterisk
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Contraseña"
            placeholder="Tu contraseña"
            withAsterisk
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group position="left" mt="lg">
            <Anchor
              component="button"
              size="sm"
              onClick={() => navigate("/forgot-password")}
            >
              ¿Olvidaste tu contraseña?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Iniciar sesión
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;

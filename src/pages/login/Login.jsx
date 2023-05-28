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
  const { setErrorMessage, errorMessage, isLoading, authFunctions, data } =
    useAuth();
  const { userLogin } = useContext(ActionContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.isValid)
      return setErrorMessage("Usuario y/o contraseña incorrectos");

    try {
      let res = await authFunctions("login", form.values);
      if (res) {
        console.log(res);
        userLogin(res);
      }
    } catch (e) {
      setErrorMessage("Usuario y/o contraseña incorrectos");
      console.log(e, errorMessage);
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@adviters\.com$/.test(value)
          ? null
          : "El correo es inválido",
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value)
          ? null
          : "Contraseña inválida",
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
        <form onSubmit={form.onSubmit(handleLogin)}>
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
          <p
            style={{
              color: "red",
              margin: "5px",
              marginLeft: "0",
              fontSize: "12px",
            }}
          >
            {errorMessage}
          </p>
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

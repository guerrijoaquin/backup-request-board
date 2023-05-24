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
} from "@mantine/core";
import useAuth from "../../hooks/useAuth";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import { ActionContext } from "../../context/ContextProvider";

const Login = () => {
  const { isError, isLoading, authFunctions } = useAuth();
  const { userLogin } = useContext(ActionContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    form.validate();

    if (form.isValid()) {
      console.log("todo ok");
      let data = await authFunctions("login", form.values);
      console.log(data);
      if (isError) return;
      userLogin(data);
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^[a-zA-Z0-9]+@adviters\.com$/.test(value)
          ? null
          : "El correo no es válido",
      password: (value) =>
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value)
          ? null
          : "La contraseña debe tener por lo menos una letra mayúscula, minúscula y un número.",
    },
  });

  if (isLoading) {
    return <Loader />;
  }

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

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        component="form"
        onSubmit={handleLogin}
      >
        <TextInput
          label="Correo electrónico"
          placeholder="tucorreo@ejemplo.com"
          required
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Contraseña"
          placeholder="Tu contraseña"
          required
          mt="md"
          {...form.getInputProps("password")}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Recordarme" />
          <Anchor component="button" size="sm">
            ¿Olvidaste tu contraseña?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit">
          Iniciar sesión
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;

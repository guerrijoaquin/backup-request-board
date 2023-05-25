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
  const { userLogin } = useContext(ActionContext);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    //   console.log("todo ok");
    //   let data = await authFunctions("login", form.values);
    //   console.log(data);
    //   if (isError) return;
    //   userLogin(data);
      // authFunctions("login", {
      //   email: data.email,
      //   username: data.username,
      //   password: data.password
      // }, nextStep);
      alert('valid: ', data)
  };

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: (value) => (/^[a-zA-Z0-9\._%+-]+@adviters\.com$/.test(value) ? null : 'El email debe pertenecer a adviters'),
      password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value) ? null : 'La contraseña es débil')
    }
  })

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
        <LoadingOverlay visible={isLoading} overlayBlur={2}/>
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
        <Group position="apart" mt="lg">
          <Checkbox label="Recordarme" />
          <Anchor component="button" size="sm"
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

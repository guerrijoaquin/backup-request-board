import { useState } from "react";
import {
  Text,
  Stepper,
  Button,
  TextInput,
  PasswordInput,
  Container,
  Center,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useAuth from "../../hooks/useAuth";
import { customNotif } from "../../utils/simplifiedNotifications";

const CreateAccount = () => {
  const { errorMessage, isLoading, authFunctions } = useAuth();
  const [active, setActive] = useState(0);

  const nextStep = () => {
    setActive((current) => current + 1);
  };

  const signUpForm = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      rePassword: "",
    },

    validate: {
      email: (value) =>
        /^[a-zA-Z0-9\._%+-]+@adviters\.com$/.test(value)
          ? null
          : "El email debe pertenecer a adviters",
      username: (value) =>
        /^[a-zA-Z0-9]+$/.test(value) ? null : "Usuario inválido",
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value)
          ? null
          : "La contraseña es débil",
      rePassword: (value, values) =>
        value === values.password ? null : "Las contraseñas no coinciden",
    },
  });

  const SignUp = async (data) => {
    try {
      await authFunctions(
        "signup",
        {
          email: data.email,
          username: data.username,
          password: data.password,
        },
        nextStep
      );
    } catch (error) {
      console.log(error);
      customNotif(
        "error",
        "No ha sido posible crear la cuenta, intente nuevamente y verifique los datos"
      );
    }
  };

  return (
    <Center>
      <Container size={700} my={50}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="Primer paso" description="Crear una cuenta">
            <Container size={400} my={50} pos="relative">
              <LoadingOverlay visible={isLoading} overlayBlur={2} />
              <form onSubmit={signUpForm.onSubmit(SignUp)}>
                <TextInput
                  label="Email"
                  placeholder="tucorreo@adviters.com"
                  withAsterisk
                  {...signUpForm.getInputProps("email")}
                />
                <TextInput
                  label="Nombre de usuario"
                  placeholder="tuusuario"
                  withAsterisk
                  {...signUpForm.getInputProps("username")}
                />
                <PasswordInput
                  label="Contraseña"
                  placeholder="Crear una contraseña"
                  withAsterisk
                  {...signUpForm.getInputProps("password")}
                />
                <PasswordInput
                  label="Confirmar contraseña"
                  placeholder="Confirma la contraseña"
                  withAsterisk
                  {...signUpForm.getInputProps("rePassword")}
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
                <Button type="submit" mt={"sm"} fullWidth>
                  Registrarse
                </Button>
              </form>
            </Container>
          </Stepper.Step>
          <Stepper.Step
            label="Segundo paso"
            description="Verificar correo electrónico"
          >
            <Container size={800} my={50} pos="relative">
              <Center>
                <Text>
                  Verifique su dirección de correo electrónico ingresando al
                  link que recibió.
                </Text>
              </Center>
            </Container>
          </Stepper.Step>
        </Stepper>
      </Container>
    </Center>
  );
};

export default CreateAccount;

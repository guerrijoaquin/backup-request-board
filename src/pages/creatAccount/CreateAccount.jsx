import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Container,
  Center,
} from "@mantine/core";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const nextStep = () => {
    if (active < 3) {
      const isEmailValid = validateEmail(email);
      const isPasswordValid = validatePassword(password);
      const isConfirmPasswordValid = validateConfirmPassword(
        password,
        confirmPassword
      );

      if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setActive((current) => current + 1);
      } else {
        if (!isEmailValid) {
          setEmailError("El correo electrónico no es válido");
        } else {
          setEmailError("");
        }

        if (!isPasswordValid) {
          setPasswordError(
            "La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula y un número."
          );
        } else {
          setPasswordError("");
        }

        if (!isConfirmPasswordValid) {
          setConfirmPasswordError("Las contraseñas no coinciden.");
        } else {
          setConfirmPasswordError("");
        }
      }
    } else {
      navigate("/login");
      console.log("Redirigir a la pantalla de inicio de sesión");
    }

    if (active === 3) {
      const isUsernameValid = validateUsername(username);
      if (isUsernameValid) {
        setUsernameError("");
      } else {
        if (!isUsernameValid) {
          setUsernameError(
            "El nombre de usuario no debe contener caracteres especiales ni espacios."
          );
        } else {
          setUsernameError("");
        }
      }
    }
  };

  const prevStep = () => {
    if (active === 0) {
      navigate("/");
      console.log("Redirigir a la pantalla de inicio de sesión");
    } else {
      setActive((current) => current - 1);
    }
  };

  const validateEmail = (email) => {
    const isValid = /^[a-zA-Z0-9._%+-]+@adviters\.com$/.test(email);
    return isValid;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    const isValid = passwordRegex.test(password);
    return isValid;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const isValid = usernameRegex.test(username);
    return isValid;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <Center>
      <Container size={700} my={50}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="Primer paso" description="Crear una cuenta">
            <Container size={400} my={50}>
              <TextInput
                label="Email"
                placeholder="tucorreo@adviters.com"
                required
                error={emailError}
                value={email}
                onChange={handleEmailChange}
              />
              <PasswordInput
                label="Contraseña"
                placeholder="Crear una contraseña"
                required
                error={passwordError}
                value={password}
                onChange={handlePasswordChange}
              />
              <PasswordInput
                label="Confirmar contraseña"
                placeholder="Confirma la contraseña"
                required
                error={confirmPasswordError}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </Container>
          </Stepper.Step>
          <Stepper.Step
            label="Segundo paso"
            description="Verificar correo electrónico"
          >
            <Container size={400} my={50}>
              <TextInput label="Email" value={email} readOnly />
              <TextInput
                label="Código de confirmación"
                placeholder="Ingresa el código"
                required
              />
            </Container>
          </Stepper.Step>
          <Stepper.Step
            label="Paso final"
            description="Obtener acceso completo"
          >
            <Container size={400} my={50}>
              <TextInput
                label="Crea un nombre de usuario"
                placeholder="Nombre de usuario"
                required
                error={usernameError}
                value={username}
                onChange={handleUsernameChange}
              />
            </Container>
          </Stepper.Step>
          <Stepper.Completed>
            <Container size={600} my={50}>
              <Container size={600} my={50}>
                <p>Completado!!</p>
                <p>
                  Haz clic en el botón de <strong>Atrás</strong> para volver al
                  paso anterior,
                </p>
                <p>
                  O clic en <strong>Finalizar</strong> para ir al login.
                </p>
              </Container>
            </Container>
          </Stepper.Completed>
        </Stepper>
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Atrás
          </Button>
          {active === 3 ? (
            <Button onClick={nextStep}>Finalizar</Button>
          ) : (
            <Button onClick={nextStep}>Siguiente paso</Button>
          )}
        </Group>
      </Container>
    </Center>
  );
};

export default CreateAccount;

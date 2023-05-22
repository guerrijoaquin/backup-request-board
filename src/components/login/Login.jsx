import { useNavigate } from 'react-router-dom';
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
} from '@mantine/core';

import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí puedes realizar cualquier acción que desees al hacer clic en "Iniciar sesión"
    console.log('Inicio de sesión exitoso');

    // Redireccionar al usuario a la ruta "/dashboard"
    navigate('/dashboard');
  };

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
        ¿Aún no tienes una cuenta?{' '}
        <Anchor size="sm" component="button">
          Crear cuenta
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Correo electrónico" placeholder="tucorreo@ejemplo.com" required />
        <PasswordInput label="Contraseña" placeholder="Tu contraseña" required mt="md" />
        <Group position="apart" mt="lg">
          <Checkbox label="Recordarme" />
          <Anchor component="button" size="sm">
            ¿Olvidaste tu contraseña?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Iniciar sesión
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;

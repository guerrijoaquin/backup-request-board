import { Link, useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core';

import './Login.css';
import useAuth from '../../hooks/useAuth';
import { useForm } from '@mantine/form';
import { useContext } from 'react';
import { ActionContext } from '../../context/ContextProvider';

const Login = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { isError, isLoading, authFunctions } = useAuth();
  const { userLogin } = useContext(ActionContext);

  const handleLogin = (e) => {
    e.preventDefault();

    form.validate();

    if (form.isValid()) {
      console.log('todo ok');
      userLogin({ ok: true });
      navigate('/dashboard');
    }
  };

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      password: (value) =>
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value)
          ? null
          : 'La contraseña debe tener por lo menos una letra mayúscula, minúscula y un número.',
    },
  });

  return (
    <Container size={420} my={40}>
      <Title align="center" className="login-title">
        ¡Bienvenido de nuevo!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        ¿Aún no tienes una cuenta?{' '}
        <Link to="/create-account">
          <Anchor size="sm" component="button">
            Crear cuenta
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" component="form" onSubmit={handleLogin}>
        <TextInput label="Correo electrónico" placeholder="tucorreo@adviters.com" required {...form.getInputProps('email')} />
        <PasswordInput
          label="Contraseña"
          placeholder="Tu contraseña"
          required
          mt="md"
          {...form.getInputProps('password')}
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

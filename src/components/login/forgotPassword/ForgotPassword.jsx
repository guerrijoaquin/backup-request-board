import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Text, Stepper, Button, Group, TextInput, PasswordInput, Container, Center, NumberInput, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import useAuth from '../../../hooks/useAuth'
import { customNotif } from '../../../utils/simplifiedNotifications';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState(0);
    const { setErrorMessage, errorMessage, isLoading, authFunctions } = useAuth();

    const nextStep = () => {
        setActive((current) => current + 1);
        setErrorMessage('')
    };

    const prevStep = () => {
        setActive((current) => current - 1);
        setErrorMessage('')
    };

    const emailForm = useForm({
        validate: {
            email: (value) => /^[a-zA-Z0-9._%+-]+@adviters\.com$/.test(value) ? null : 'El usuario no existe.'
        }
    })

    const codeForm = useForm({
        validate: {
            code: (value) => value ? null : 'Ingrese el código.',
            password: (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value)
                ? null
                : "La contraseña es débil",
            rePassword: (value, values) =>
                value === values.password ? null : "Las contraseñas no coinciden",
        }
    })

    const sendCode = async ({email}) => {

        try {
            await authFunctions(
              "requestcode",
              {
                email
              },
              nextStep
            );
          } catch (error) {
            if (error?.response?.data?.statusCode === 400) setErrorMessage('El usuario no existe')
            customNotif(
              "error",
              "No se pudo enviar el código"
            );
          }

    }
    
    const changePassword = async ({code, password}) => {

        try {
            await authFunctions(
              "changepassword",
              {
                email: emailForm.values.email,
                code,
                password
              },
              nextStep
            );
          } catch (error) {
            if (error?.response?.data?.statusCode === 400) setErrorMessage('El código es incorrecto')
            console.log('eror', error)
            customNotif(
              "error",
              "No se pudo cambiar la contraseña"
            );
          }

    }
    return (
        <Center>
            <Container size={830} my={50}>
                <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                    <Stepper.Step label="Paso 1" description="Ingresa tu correo electrónico">
                        <Container size={400} my={50}>
                            <LoadingOverlay visible={isLoading} overlayBlur={2} />
                            <form onSubmit={emailForm.onSubmit(sendCode)}>
                                <TextInput
                                    label="Email"
                                    placeholder="tucorreo@adviters.com"
                                    withAsterisk
                                    {...emailForm.getInputProps('email')}
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
                                <Button mt='xs' type='submit' fullWidth>Siguiente</Button>
                            </form>
                        </Container>
                    </Stepper.Step>
                    <Stepper.Step label="Paso 2" description="Crear nueva contraseña">
                        <LoadingOverlay visible={isLoading} overlayBlur={2} />
                        <Container size={800} my={50}>
                            <Center>
                                <Text>Código de recuperación enviado al email: <strong>{emailForm.values.email}</strong></Text>
                            </Center>
                        </Container>
                        <Container size={400} my={50}>
                            <form onSubmit={codeForm.onSubmit(changePassword)}>
                                <NumberInput
                                    label="Código de recuperación"
                                    placeholder="Ingresa el código"
                                    withAsterisk
                                    hideControls
                                    {...codeForm.getInputProps('code')}
                                />
                                <PasswordInput
                                label="Crear contraseña"
                                placeholder="Nueva contraseña"
                                withAsterisk
                                {...codeForm.getInputProps("password")}
                                />
                                <PasswordInput
                                label="Confirmar contraseña"
                                placeholder="Confirma la contraseña"
                                withAsterisk
                                {...codeForm.getInputProps("rePassword")}
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
                                <Button type='submit' mt={'xs'} fullWidth>Cambiar contraseña</Button>
                            </form>
                        </Container>
                    </Stepper.Step>
                    <Stepper.Completed>
                        <Container size={600} my={50}>
                            <Container size={600} my={50}>
                                <p>¡Contraseña actualizada con éxito!</p>
                                <Link to='/'>Iniciar sesión</Link>
                            </Container>
                        </Container>
                    </Stepper.Completed>
                </Stepper>
                <Group position="center" mt="xl">
                    {active === 1 && 
                    <Button variant="default" onClick={prevStep}>
                        Atrás
                    </Button>
                    }
                </Group>
            </Container>
        </Center>
    );
};

export default ForgotPassword;
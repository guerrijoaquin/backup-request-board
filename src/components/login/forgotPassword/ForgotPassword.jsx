import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper, Button, Group, TextInput, PasswordInput, Container, Center } from '@mantine/core';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState(0);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [confirmationCodeError, setConfirmationCodeError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');


    const nextStep = () => {
        if (active === 0) {
            const isEmailValid = validateEmail(email);
            const isUsernameValid = validateUsername(username);
            if (isEmailValid && isUsernameValid) {
                setEmailError('');
                setUsernameError('');
                setActive(1);
            } else {
                setEmailError('El correo electrónico debe pertenecer a "@adviters.com"');
            }
        } else if (active === 1) {
            const isCodeValid = validateConfirmationCode(confirmationCode);
            if (isCodeValid) {
                setConfirmationCodeError('');
                setActive(2);
            } else {
                setConfirmationCodeError('El código de confirmación no es válido');
            }
        } else if (active === 2) {
            const isNewPasswordValid = validateNewPassword(newPassword);
            const isConfirmPasswordValid = validateConfirmPassword(newPassword, confirmPassword);

            if (!isConfirmPasswordValid) {
                setConfirmPasswordError('Las contraseñas no coinciden.');
            } else {
                setConfirmPasswordError('');
            }

            if (isNewPasswordValid) {
                setNewPasswordError('');
                setActive(3);
            } else {
                setNewPasswordError('La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula y un número.');
            }

        } else if (active === 3) {
            navigate('/login');
        }

    };

    const prevStep = () => {
        if (active === 0) {
            navigate('/login');
            console.log('Redirigir a la pantalla de inicio de sesión');
        } else {
            setActive((current) => current - 1);
        }
    };

    const validateEmail = (email) => {
        const isValid = /^[a-zA-Z0-9._%+-]+@adviters\.com$/.test(email);
        return isValid;
    };

    const validateConfirmationCode = (code) => {
        // Agrega aquí la lógica de validación del código de confirmación
        return code.length > 0;
    };

    const validateNewPassword = (password) => {
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

    const handleConfirmationCodeChange = (event) => {
        setConfirmationCode(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    return (
        <Center>
            <Container size={830} my={50}>
                <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                    <Stepper.Step label="Paso 1" description="Ingresa tu correo electrónico">
                        <Container size={400} my={50}>
                            <TextInput
                                label="Email"
                                placeholder="tucorreo@adviters.com"
                                required
                                error={emailError}
                                value={email}
                                onChange={handleEmailChange}
                            />

                            <TextInput
                                label="Nombre de usuario"
                                placeholder="Nombre de usuario"
                                required
                                error={usernameError}
                                value={username}
                                onChange={handleUsernameChange}
                            />

                        </Container>
                    </Stepper.Step>
                    <Stepper.Step label="Paso 2" description="Ingresa el código de confirmación">
                        <Container size={400} my={50}>
                            <TextInput
                                label="Email"
                                value={email}
                                readOnly
                            />
                            <TextInput
                                label="Código de confirmación"
                                placeholder="Ingresa el código"
                                required
                                error={confirmationCodeError}
                                value={confirmationCode}
                                onChange={handleConfirmationCodeChange}
                            />
                        </Container>
                    </Stepper.Step>
                    <Stepper.Step label="Paso 3" description="Ingresa una nueva contraseña">
                        <Container size={400} my={50}>
                            <TextInput
                                label="Email"
                                value={email}
                                readOnly
                            />
                            <PasswordInput
                                label="Nueva contraseña"
                                placeholder="Ingresa una nueva contraseña"
                                required
                                error={newPasswordError}
                                value={newPassword}
                                onChange={handleNewPasswordChange}
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
                    <Stepper.Completed>
                        <Container size={600} my={50}>
                            <Container size={600} my={50}>
                                <p>Completado!!</p>
                                <p>
                                    Haz clic en el botón de <strong>Atrás</strong> para volver al paso anterior,
                                </p>
                                <p>O clic en <strong>Finalizar</strong> para ir al inicio de sesión.</p>
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

export default ForgotPassword;
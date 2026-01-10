import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function LoginPage() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseData = await login(loginData.username, loginData.password);
            localStorage.setItem('access_token', responseData.access_token);
            alert("Inicio de sesión exitoso");
            navigate('/');
        } catch (error) {
            console.error("Error en el inicio de sesión", error);
            alert("Error en el inicio de sesión");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
            }}
        >
            <Typography variant="h5" gutterBottom>
                Inicio de sesión
            </Typography>

            <TextField
                label="Usuario"
                name="username"
                variant="outlined"
                value={loginData.username}
                onChange={handleChange}
                required
            />

            <TextField
                label="Contraseña"
                name="password"
                type="password"
                variant="outlined"
                value={loginData.password}
                onChange={handleChange}
                required
            />

            <Button variant="contained" type="submit" color="primary">
                Iniciar sesión
            </Button>
        </Box>
    );
}

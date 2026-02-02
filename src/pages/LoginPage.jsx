import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import Spinner from "../components/Spinner";

export default function LoginPage() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const responseData = await login(loginData.username, loginData.password);
            localStorage.setItem('access_token', responseData.access_token);
            alert("Inicio de sesión exitoso");
            navigate('/');
        } catch (error) {
            console.error("Error en el inicio de sesión", error);
            alert("Error en el inicio de sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
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

            {loading && <Spinner />}

            <TextField
                label="Usuario"
                name="username"
                variant="outlined"
                value={loginData.username}
                onChange={handleChange}
                required
                disabled={loading}
            />

            <TextField
                label="Contraseña"
                name="password"
                type="password"
                variant="outlined"
                value={loginData.password}
                onChange={handleChange}
                required
                disabled={loading}
            />

            <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={loading}
            >
                {loading ? "Ingresando..." : "Iniciar sesión"}
            </Button>
        </Box>
    );
}
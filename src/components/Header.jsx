import { AppBar, Button, Container, Toolbar } from "@mui/material";
import pokedexLogo from "../assets/logo.png";

import './Header.css';
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const isLoggedIn = localStorage.getItem('access_token') !== null;
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        alert("Cierre de sesión exitoso");
        navigate('/');
    }

    return (
        <header className="pokedex-navbar">
            <AppBar position="static">
                <Toolbar>
                    <div className="image-conteiner">
                        <img src={pokedexLogo} alt="Pokédex Logo" height={100} />
                    </div>
                </Toolbar>
                <Toolbar>
                    <Button color="inherit" href="/">Inicio</Button>
                    {isLoggedIn &&
                        <>
                            <Button color="inherit" href="/add-pokemon">Agregar Pokémon</Button>
                            <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
                        </>
                    }
                    {!isLoggedIn && <Button color="inherit" href="/login">Iniciar sesión</Button>}
                </Toolbar>
            </AppBar>
        </header>
    );
}
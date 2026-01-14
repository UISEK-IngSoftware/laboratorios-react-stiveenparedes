import { AppBar, Button, Container, Toolbar } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import GroupsIcon from "@mui/icons-material/Groups";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import pokedexLogo from "../assets/logo.png";
import "./Header.css";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const isLoggedIn = localStorage.getItem("access_token") !== null;
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        alert("Cierre de sesión exitoso");
        navigate("/");
    };

    return (
        <header className="pokedex-navbar">
            <AppBar position="static">
                <Toolbar>
                    <div className="image-conteiner">
                        <img src={pokedexLogo} alt="Pokédex Logo" height={100} />
                    </div>
                </Toolbar>

                <Toolbar>
                    <Button
                        color="inherit"
                        startIcon={<CatchingPokemonIcon />}
                        href="/"
                    >
                        Pokémon
                    </Button>

                    <Button
                        color="inherit"
                        startIcon={<GroupsIcon />}
                        href="/trainers"
                    >
                        Entrenadores
                    </Button>

                    {isLoggedIn && (
                        <>
                            <Button
                                color="inherit"
                                startIcon={<AddCircleIcon />}
                                href="/add-pokemon"
                            >
                                Agregar Pokémon
                            </Button>

                            <Button
                                color="inherit"
                                startIcon={<AddCircleIcon />}
                                href="/add-trainer"
                            >
                                Agregar Entrenador
                            </Button>

                            <Button
                                color="inherit"
                                startIcon={<LogoutIcon />}
                                onClick={handleLogout}
                            >
                                Cerrar Sesión
                            </Button>
                        </>
                    )}

                    {!isLoggedIn && (
                        <Button
                            color="inherit"
                            startIcon={<LoginIcon />}
                            href="/login"
                        >
                            Iniciar sesión
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </header>
    );
}

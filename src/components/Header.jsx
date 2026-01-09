import { AppBar, Button, Container, Toolbar } from "@mui/material";
import pokedexLogo from "../assets/logo.png";

import './Header.css';

export default function Header() {
    return (
        <header className="pokedex-navbar">
            <Container>
                <AppBar position="static">
                    <Toolbar>
                        <div className="image-conteiner">
                            <img src={pokedexLogo} alt="Pokédex Logo" height={100}/>
                        </div>
                    </Toolbar>
                    <Toolbar>
                        <Button color="inherit" href="/">Inicio</Button>
                        <Button color="inherit" href="/add-pokemon">Agregar Pokémon</Button>
                    </Toolbar>
                </AppBar>
            </Container>
        </header>
    );
}
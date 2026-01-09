import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemons } from "../services/PokemonService";

export default function PokemonList() {

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetchPokemons()
            .then(setPokemons)
            .catch((error) => {
                alert("Error obteniendo los pokemones");
                console.error(error);
            });
    }, []);


    return (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {pokemons.map((pokemon, index) => (
                <Grid key={index} xs={12} sm={6} md={4}>
                    <PokemonCard pokemon={pokemon} />
                </Grid>
            ))}
        </Grid>
    );
}

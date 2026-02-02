import { useState, useEffect } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemons } from "../services/pokemonService";
import Spinner from "../components/Spinner";

export default function PokemonList() {

    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchPokemons()
            .then(setPokemons)
            .catch((error) => {
                alert("Error obteniendo los pokemones");
                console.error(error);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Spinner />
        );
    }

    return (
        <Grid container spacing={2} sx={{ marginTop: 2 }} justifyContent="center">
            {pokemons.map((pokemon, index) => (
                <Grid key={index} xs={12} sm={6} md={4}>
                    <PokemonCard pokemon={pokemon} />
                </Grid>
            ))}
        </Grid>
    );
}

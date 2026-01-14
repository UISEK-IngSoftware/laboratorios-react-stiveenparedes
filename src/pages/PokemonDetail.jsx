import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonById } from "../services/pokemonService";

export default function PokemonDetail() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;

    useEffect(() => {
        getPokemonById(id)
            .then(setPokemon)
            .catch(() => alert("Error al obtener el Pokémon"));
    }, [id]);

    if (!pokemon) return <Typography>Cargando...</Typography>;

    return (
        <Card>
            <CardMedia
                component="img"
                height={300}
                image={`${mediaUrl}/${pokemon.picture}`}
                alt={pokemon.name}
                sx={{ objectFit: "contain", backgroundColor: "#f5f5f5" }}
            />

            <CardContent>
                <Typography variant="h4">{pokemon.name}</Typography>
                <Typography>Tipo: {pokemon.type}</Typography>
                <Typography>Peso: {pokemon.weight}</Typography>
                <Typography>Altura: {pokemon.height}</Typography>
            </CardContent>
        </Card>
    );
}

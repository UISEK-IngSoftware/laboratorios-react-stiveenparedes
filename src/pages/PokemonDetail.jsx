import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonById } from "../services/pokemonService";
import Spinner from "../components/Spinner";

export default function PokemonDetail() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;

    useEffect(() => {
        setLoading(true);
        getPokemonById(id)
            .then(setPokemon)
            .catch(() => alert("Error al obtener el Pokémon"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Spinner />;
    if (!pokemon) return null;

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
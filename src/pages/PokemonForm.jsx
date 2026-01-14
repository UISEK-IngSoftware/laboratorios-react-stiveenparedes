import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPokemon, getPokemonById, updatePokemon } from "../services/pokemonService";

export default function PokemonForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [pokemonData, setPokemonData] = useState({
        name: '',
        type: '',
        weight: '',
        height: '',
        picture: null
    });

    
    useEffect(() => {
        if (id) {
            getPokemonById(id).then((data) => {
                setPokemonData({
                    name: data.name,
                    type: data.type,
                    weight: data.weight,
                    height: data.height,
                    picture: null
                });
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setPokemonData({
            ...pokemonData,
            [name]: name === 'picture' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                await updatePokemon(id, pokemonData);
                alert("Pokémon actualizado correctamente");
            } else {
                await addPokemon(pokemonData);
                alert("Pokémon agregado exitosamente");
            }

            navigate('/');
        } catch (error) {
            console.error("Error", error);
            alert("Ocurrió un error");
        }
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                {id ? "Editar Pokémon" : "Agregar Pokémon"}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Nombre"
                    name="name"
                    value={pokemonData.name}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Tipo"
                    name="type"
                    value={pokemonData.type}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Peso"
                    name="weight"
                    value={pokemonData.weight}
                    onChange={handleChange}
                />

                <TextField
                    label="Altura"
                    name="height"
                    value={pokemonData.height}
                    onChange={handleChange}
                />

                <input type="file" name="picture" onChange={handleChange} />

                <Button variant="contained" type="submit">
                    {id ? "Actualizar Pokémon" : "Agregar Pokémon"}
                </Button>
            </Box>
        </>
    );
}

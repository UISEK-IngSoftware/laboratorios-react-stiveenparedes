import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPokemon } from "../services/PokemonService";

export default function PokemonForm() {
    const navigate = useNavigate();
    const [pokemonData, setPokemonData] = useState({
        name: '',
        type: '',
        weight: '',
        height: '',
        picture: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'picture') {
            setPokemonData({
                ...pokemonData,
                picture: files[0]
            });
        } else {
            setPokemonData({
                ...pokemonData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPokemon = await addPokemon(pokemonData);
            alert("Pokémon agregado exitosamente");
            console.log("Nuevo Pokémon:", newPokemon);
            navigate('/');
        } catch (error) {
            console.error("Error al agregar el Pokémon", error);
            alert("Error al agregar el Pokémon");
        }
    }

    return (
        <>
            <Typography variant="h4"  gutterBottom>
                Formulario de Pokemon.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Nombre" name="name" variant="outlined" onChange={handleChange} value={pokemonData.name}/>
                <TextField label="Tipo" name="type" variant="outlined" onChange={handleChange} value={pokemonData.type} />
                <TextField label="Peso" name="weight" variant="outlined" onChange={handleChange} value={pokemonData.weight} />
                <TextField label="Altura" name="height" variant="outlined" onChange={handleChange} value={pokemonData.height} />
                <input type="file" name="picture" onChange={handleChange}/>
                <Button variant="contained" type="submit"> Agregar Pokémon </Button>
            </Box>
        </>
    );
}
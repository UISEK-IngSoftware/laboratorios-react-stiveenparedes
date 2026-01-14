import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addTrainer, getTrainerById, updateTrainer } from "../services/trainerService";

export default function TrainerForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [trainerData, setTrainerData] = useState({
        first_name: '',
        last_name: '',
        birthdate: '',
        level: '',
        picture: null
    });

    useEffect(() => {
        if (id) {
            getTrainerById(id).then((data) => {
                setTrainerData({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    birthdate: data.birthdate,
                    level: data.level,
                    picture: null
                });
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setTrainerData({
            ...trainerData,
            [name]: name === 'picture' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                await updateTrainer(id, trainerData);
                alert("Entrenador actualizado correctamente");
            } else {
                await addTrainer(trainerData);
                alert("Entrenador agregado exitosamente");
            }

            navigate('/trainers');
        } catch (error) {
            console.error("Error", error);
            alert("Ocurrió un error");
        }
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                {id ? "Editar Entrenador" : "Agregar Entrenador"}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Nombre" name="first_name" value={trainerData.first_name} onChange={handleChange} required />
                <TextField label="Apellido" name="last_name" value={trainerData.last_name} onChange={handleChange} required />
                <TextField type="date" label="Fecha de nacimiento" name="birthdate" value={trainerData.birthdate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                <TextField label="Nivel" name="level" value={trainerData.level} onChange={handleChange} />
                <input type="file" name="picture" onChange={handleChange} />
                <Button variant="contained" type="submit">
                    {id ? "Actualizar Entrenador" : "Agregar Entrenador"}
                </Button>
            </Box>
        </>
    );
}

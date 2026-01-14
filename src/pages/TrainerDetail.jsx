import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrainerById } from "../services/trainerService";

export default function TrainerDetail() {
    const { id } = useParams();
    const [trainer, setTrainer] = useState(null);
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;

    useEffect(() => {
        getTrainerById(id)
            .then(setTrainer)
            .catch(() => alert("Error al obtener el Entrenador"));
    }, [id]);

    if (!trainer) return <Typography>Cargando...</Typography>;

    return (
        <Card>
            <CardMedia
                component="img"
                height={300}
                image={`${mediaUrl}/${trainer.picture}`}
                alt={`${trainer.first_name} ${trainer.last_name}`}
                sx={{ objectFit: "contain", backgroundColor: "#f5f5f5" }}
            />

            <CardContent>
                <Typography variant="h4">
                    {trainer.first_name} {trainer.last_name}
                </Typography>
                <Typography>Nivel: {trainer.level}</Typography>
                <Typography>Fecha de nacimiento: {trainer.birthdate}</Typography>
            </CardContent>
        </Card>
    );
}

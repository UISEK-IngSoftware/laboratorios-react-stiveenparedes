import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrainerById } from "../services/trainerService";
import Spinner from "../components/Spinner";

export default function TrainerDetail() {
    const { id } = useParams();
    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(false);
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;

    useEffect(() => {
        setLoading(true);
        getTrainerById(id)
            .then(setTrainer)
            .catch(() => alert("Error al obtener el Entrenador"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Spinner />;
    if (!trainer) return null;

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
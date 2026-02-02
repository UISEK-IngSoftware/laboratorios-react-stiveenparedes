import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import TrainerCard from "../components/TrainerCard";
import { fetchTrainers } from "../services/trainerService";
import Spinner from "../components/Spinner";

export default function TrainerList() {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchTrainers()
            .then(setTrainers)
            .catch((error) => {
                alert("Error obteniendo los entrenadores");
                console.error(error);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner />;

    return (
        <Grid container spacing={2} sx={{ marginTop: 2 }} justifyContent="center">
            {trainers.map((trainer, index) => (
                <Grid key={index} xs={12} sm={6} md={4}>
                    <TrainerCard trainer={trainer} />
                </Grid>
            ))}
        </Grid>
    );
}
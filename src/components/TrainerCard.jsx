import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deleteTrainer } from "../services/trainerService";

export default function TrainerCard({ trainer }) {
    const navigate = useNavigate();
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;
    const isLoggedIn = !!localStorage.getItem("access_token");

    trainer.image = `${mediaUrl}/${trainer.picture}`;

    const handleDelete = async () => {
        const confirmDelete = window.confirm("¿Seguro que deseas eliminar este Entrenador?");
        if (!confirmDelete) return;

        try {
            await deleteTrainer(trainer.id);
            alert("Entrenador eliminado correctamente");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar el Entrenador");
        }
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height={200}
                image={trainer.image}
                alt={`${trainer.first_name} ${trainer.last_name}`}
                sx={{
                    objectFit: "contain",
                    backgroundColor: "#f5f5f5"
                }}
            />
            <CardContent>
                <Typography variant="h5">
                    {trainer.first_name} {trainer.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Nivel: {trainer.level}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/trainer/${trainer.id}`)}
                >
                    Ver más
                </Button>

                {isLoggedIn && (
                    <>
                        <Button
                            size="small"
                            startIcon={<EditIcon />}
                            sx={{
                                color: "#f57c00",
                                "&:hover": {
                                    backgroundColor: "rgba(245, 124, 0, 0.1)"
                                }
                            }}
                            onClick={() => navigate(`/edit-trainer/${trainer.id}`)}
                        >
                            Editar
                        </Button>

                        <Button
                            size="small"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleDelete}
                        >
                            Eliminar
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
}

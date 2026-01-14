import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

/**
 * Obtener lista de Trainers
 * @returns
 */
export async function fetchTrainers() {
    const response = await axios.get(`${API_BASE_URL}/trainers/`);

    if (Array.isArray(response.data)) {
        return response.data;
    }

    if (Array.isArray(response.data.results)) {
        return response.data.results;
    }

    return [];
}

/**
 * Convertir archivo a Base64
 * @param {*} file
 * @returns
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Crear Trainer
 * @param {*} trainerData
 * @returns
 */
export async function addTrainer(trainerData) {
    let pictureBase64 = '';
    if (trainerData.picture) {
        pictureBase64 = await fileToBase64(trainerData.picture);
    }

    const payload = {
        ...trainerData,
        picture: pictureBase64
    };

    const response = await axios.post(`${API_BASE_URL}/trainers/`, payload);
    return response.data;
}

/**
 * Obtener Trainer por ID
 * @param {*} id
 * @returns
 */
export async function getTrainerById(id) {
    const response = await axios.get(`${API_BASE_URL}/trainers/${id}/`);
    return response.data;
}

/**
 * Actualizar Trainer
 * @param {*} id
 * @param {*} trainerData
 * @returns
 */
export async function updateTrainer(id, trainerData) {
    let pictureBase64 = '';
    if (trainerData.picture) {
        pictureBase64 = await fileToBase64(trainerData.picture);
    }

    const payload = {
        ...trainerData,
        picture: pictureBase64
    };

    const response = await axios.put(`${API_BASE_URL}/trainers/${id}/`, payload);
    return response.data;
}

/**
 * Eliminar Trainer
 * @param {*} id
 */
export async function deleteTrainer(id) {
    await axios.delete(`${API_BASE_URL}/trainers/${id}/`);
}

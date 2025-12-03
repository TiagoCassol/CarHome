import axios from "axios"

const URI = "http://localhost:3000/api/brands";

async function listar() {
    const response = await axios.get(URI);
    return response.data;
}

async function atualizar(id: number, brand: any) {
    const response = await axios.put(`${URI}/${id}`, brand);
    return response.data;
}

async function excluir(id: number) {
    const response = await axios.delete(`${URI}/${id}`);
    return response.data;
}

export default {
    listar,
    atualizar,
    excluir,
}
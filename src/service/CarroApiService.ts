import axios from "axios"

const URI = "http://localhost:3000/carros";

async function listar() {
    const response = await axios.get(URI);
    return response.data;
}

async function inserir(carro: any) {
    const response = await axios.post(URI, carro);
    return response.data;
}

async function buscarPorId(id: number) {
    const response = await axios.get(`${URI}/${id}`);
    return response.data;
}

async function atualizar(id: number, carro: any) {
    const response = await axios.put(`${URI}/${id}`, carro);
    return response.data;
}

async function excluir(id: number) {
    const response = await axios.delete(`${URI}/${id}`);
    return response.data;
}

async function buscarPorMarca(marca: string) {
    const response = await axios.get(`${URI}?marca=${marca}`);
    return response.data;
}

async function buscarPorFaixaPreco(precoMin: number, precoMax: number) {
    const response = await axios.get(`${URI}?preco_gte=${precoMin}&preco_lte=${precoMax}`);
    return response.data;
}

export default {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    excluir,
    buscarPorMarca,
    buscarPorFaixaPreco
}
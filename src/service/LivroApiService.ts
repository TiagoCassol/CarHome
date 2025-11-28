import axios from "axios"

const URI = "http://localhost:3000/livros";

 async function listar() {
    const response = await axios.get(URI);
    return response.data;
}

async function inserir(livro: any) {
    const response = await axios.post(URI, livro);
    return response.data;
}

export default {
    listar,
    inserir
}


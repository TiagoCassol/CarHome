import axios from "axios"

//const URI = "http://localhost:3000/api/carros";

// ✅ Cria instância do axios com configuração padrão
const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/json'
    }
});

// ✅ Interceptor para adicionar token automaticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

async function listar() {
    const response = await api.get("/api/carros");
    return response.data;
}

async function inserir(carro: any) {
    // ✅ Verifica se tem token antes de tentar
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Faça login para anunciar um carro");
    }
    
    console.log("🔐 Token sendo usado:", token);
    const response = await api.post("/api/carros", carro);
    return response.data;
}

async function buscarPorId(id: number) {
    const response = await api.get(`/api/carros/${id}`);
    return response.data;
}

async function atualizar(id: number, carro: any) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Faça login para editar");
    }
    
    const response = await api.put(`/api/carros/${id}`, carro);
    return response.data;
}

async function excluir(id: number) {
    const response = await api.delete(`/api/carros/${id}`);
    return response.data;
}

async function deletar(id: number): Promise<void> {
    const response = await api.delete(`/api/carros/${id}`);
    return response.data;
}

async function buscarPorMarca(marca: string) {
    const response = await api.get(`/api/carros?marca=${marca}`);
    return response.data;
}

async function buscarPorFaixaPreco(precoMin: number, precoMax: number) {
    const response = await api.get(`/api/carros?preco_gte=${precoMin}&preco_lte=${precoMax}`);
    return response.data;
}

export default {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    excluir,
    buscarPorMarca,
    buscarPorFaixaPreco,
    deletar
}
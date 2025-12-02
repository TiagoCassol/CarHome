import axios from "axios"

const URI = "http://localhost:3000/api/carros";

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

async function deletar(id: number): Promise<void> {
    return fetch(`http://localhost:3000/api/carros/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      return response.json(); // Seu backend retorna JSON
    })
    .then(data => {
      console.log('✅ Carro deletado no backend:', data);
    })
    .catch(error => {
      console.error('❌ Falha ao deletar:', error);
      throw error;
    });
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
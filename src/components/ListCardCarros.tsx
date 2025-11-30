import { useEffect, useState } from "react";
import CardCarro from "./CardCarro";
import CarroApiService from "../service/CarroApiService";

interface Carro {
  id: string;
  imagem: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  quilometragem?: number;
  localizacao?: string;
}

export default function ListCardCarros() {
  const [listaCarros, setListaCarros] = useState<Carro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    CarroApiService.listar()
      .then((carros: Carro[]) => {
        console.log("API returned:", carros);
        setListaCarros(Array.isArray(carros) ? carros : []);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load carros:", err);
        setError("Falha ao carregar carros");
        setListaCarros([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="w3-container">Carregando...</p>;
  if (error) return <p className="w3-container w3-text-red">{error}</p>;
  if (listaCarros.length === 0) return <p className="w3-container">Nenhum carro encontrado</p>;

  return (
    <>
      {listaCarros.map((carro) => (
        <CardCarro key={carro.id} carro={carro} />
      ))}
    </>
  );
}
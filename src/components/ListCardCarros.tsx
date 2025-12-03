// import { useEffect, useState } from "react";
// import CardCarro from "./CardCarro";
// import CarroApiService from "../service/CarroApiService";

// interface Carro {
//   id: number;
//   imagem: string;
//   modelo: string;
//   marca: string;
//   ano: number;
//   preco: number;
//   quilometragem?: number;
//   localizacao?: string;
// }

// export default function ListCardCarros() {
//   const [listaCarros, setListaCarros] = useState<Carro[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     CarroApiService.listar()
//       .then((carros: Carro[]) => {
//         console.log("API returned:", carros);
//         setListaCarros(Array.isArray(carros) ? carros : []);
//         setError(null);
//       })
//       .catch((err) => {
//         console.error("Failed to load carros:", err);
//         setError("Falha ao carregar carros");
//         setListaCarros([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

// const handleCarroComprado = async (carroId: number) => {
//   const carroComprado = listaCarros.find(c => c.id === carroId);
//   if (!carroComprado) return;
//   try {
//     setListaCarros(prev => prev.filter(carro => carro.id !== carroId));
//     await CarroApiService.deletar(carroId);
//   } catch (error) {
//     console.error("❌ Erro ao deletar no backend:", error);
//     setListaCarros(prev => [...prev, carroComprado].sort((a, b) => a.id - b.id));
//     alert(`⚠️ Compra registrada localmente, mas houve um erro no servidor.\nO carro voltará à lista.`);
//   }
// };

//   if (loading) return <p className="w3-container">Carregando...</p>;
//   if (error) return <p className="w3-container w3-text-red">{error}</p>;
//   if (listaCarros.length === 0) return <p className="w3-container">Nenhum carro disponível</p>;

//   return (
//     <>
//       {listaCarros.map((carro) => (
//         <CardCarro
//           key={carro.id}
//           carro={carro}
//           onCarroComprado={handleCarroComprado}
//         />
//       ))}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import CardCarro from "./CardCarro";
import CarroApiService from "../service/CarroApiService";

// Define the Props interface
interface ListCardCarrosProps {
  marca?: string | null; // Optional prop
}

interface Carro {
  id: number;
  imagem: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  quilometragem?: number;
  localizacao?: string;
}

// Accept the props in the function definition
export default function ListCardCarros({ marca }: ListCardCarrosProps) {
  const [listaCarros, setListaCarros] = useState<Carro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);


    console.log("ListCardCarros: Marca prop received:", marca);

    // LOGIC SWITCH: Choose which API function to call
    const apiCall = marca
      ? CarroApiService.buscarPorMarca(marca)
      : CarroApiService.listar();

    apiCall
      .then((carros: Carro[]) => {
        console.log(`API returned for ${marca || 'all'}:`, carros);
        setListaCarros(Array.isArray(carros) ? carros : []);
        setError(null);
      })
      .catch((err: any) => {
        console.error("Failed to load carros:", err);
        setError("Falha ao carregar carros");
        setListaCarros([]);
      })
      .finally(() => setLoading(false));

  }, [marca]); // This ensures it re-runs when the 'marca' changes!

  const handleCarroComprado = async (carroId: number) => {
    const carroComprado = listaCarros.find(c => c.id === carroId);
    if (!carroComprado) return;
    try {
      setListaCarros(prev => prev.filter(carro => carro.id !== carroId));
      await CarroApiService.deletar(carroId);
    } catch (error) {
      console.error("❌ Erro ao deletar no backend:", error);
      setListaCarros(prev => [...prev, carroComprado].sort((a, b) => a.id - b.id));
      alert(`⚠️ Compra registrada localmente, mas houve um erro no servidor.\nO carro voltará à lista.`);
    }
  };

  if (loading) return <p className="w3-container w3-animate-fading">Carregando lista...</p>;
  if (error) return <p className="w3-container w3-text-red">{error}</p>;
  if (listaCarros.length === 0) return <p className="w3-container">Nenhum carro encontrado.</p>;

  return (
    <>
      {listaCarros.map((carro) => (
        <CardCarro
          key={carro.id}
          carro={carro}
          onCarroComprado={handleCarroComprado}
        />
      ))}
    </>
  );
}
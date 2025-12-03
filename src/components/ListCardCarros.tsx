import { useEffect, useState } from "react";
import CardCarro from "./CardCarro";
import CarroApiService from "../service/CarroApiService";

// ✅ ADICIONE ESTA INTERFACE:
interface ListCardCarrosProps {
  onEditarCarro?: (carroId: number) => void;
}

// ✅ ATUALIZE A INTERFACE Carro PARA INCLUIR VENDEDOR:
interface Carro {
  id: number;
  imagem: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  quilometragem: number; 
  localizacao?: string;
  vendedor: number; 
  cor: string; 
  descricao?: string; 
}

export default function ListCardCarros({ onEditarCarro }: ListCardCarrosProps) {
  const [listaCarros, setListaCarros] = useState<Carro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // ✅ FUNÇÃO PARA PEGAR O ID DO USUÁRIO DO localStorage
  const getUsuarioLogadoId = (): number | undefined => {
    try {
      const usuarioSalvo = localStorage.getItem("usuario");
      if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);
        console.log("✅ Usuário encontrado no localStorage:", usuario);
        return usuario.id;
      } else {
        console.log("⚠️ Nenhum usuário no localStorage");
      }
    } catch (error) {
      console.error("❌ Erro ao ler usuário do localStorage:", error);
    }
    return undefined;
  };

  // ✅ PEGA O ID DO USUÁRIO LOGADO
  const usuarioLogadoId = getUsuarioLogadoId();
  console.log("🔍 usuarioLogadoId para ListCardCarros:", usuarioLogadoId);

  useEffect(() => {
    setLoading(true);
    CarroApiService.listar()
      .then((carros: Carro[]) => {
        console.log("📦 API returned:", carros);
        
        // ✅ DEBUG: Mostra vendedor de cada carro
        carros.forEach(carro => {
          console.log(`Carro ${carro.id} (${carro.marca} ${carro.modelo}): vendedor=${carro.vendedor}`);
        });
        
        setListaCarros(Array.isArray(carros) ? carros : []);
        setError(null);
      })
      .catch((err) => {
        console.error("❌ Failed to load carros:", err);
        setError("Falha ao carregar carros");
        setListaCarros([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCarroComprado = async (carroId: number) => {
    const carroComprado = listaCarros.find(c => c.id === carroId);
    if (!carroComprado) return;
    
    try {
      // Remove visualmente
      setListaCarros(prev => prev.filter(carro => carro.id !== carroId));
      
      // Tenta deletar no backend
      await CarroApiService.deletar(carroId);
      
      // Mensagem de sucesso (opcional)
      alert(`✅ ${carroComprado.marca} ${carroComprado.modelo} comprado com sucesso!`);
      
    } catch (error) {
      console.error("❌ Erro ao deletar no backend:", error);
      
      // Recoloca o carro na lista
      setListaCarros(prev => [...prev, carroComprado].sort((a, b) => a.id - b.id));
      
      alert(`⚠️ Compra registrada localmente, mas houve um erro no servidor.\nO carro voltará à lista.`);
    }
  };

  if (loading) return <p className="w3-container">Carregando...</p>;
  if (error) return <p className="w3-container w3-text-red">{error}</p>;
  if (listaCarros.length === 0) return <p className="w3-container">Nenhum carro disponível</p>;

  return (
    <>
      {/* ✅ DEBUG: Mostra info do usuário (pode remover depois) */}
      <div className="w3-container w3-small w3-text-gray w3-margin-bottom">
        {usuarioLogadoId ? (
          <p>👤 Usuário logado ID: <strong>{usuarioLogadoId}</strong></p>
        ) : (
          <p>🔒 Nenhum usuário logado - faça login para ver/editar seus anúncios</p>
        )}
      </div>
      
      <div className="w3-row">
        {listaCarros.map((carro) => (
          <CardCarro 
            key={carro.id} 
            carro={carro} 
            onCarroComprado={handleCarroComprado}
            usuarioLogadoId={usuarioLogadoId}
            onEditar={onEditarCarro}
          />
        ))}
      </div>
    </>
  );
}
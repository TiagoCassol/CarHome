import { Route, Routes } from "react-router-dom";
import { useState } from "react"; // ✅ Adicione useState
import App from "./App";
import ListCardCarros from "./components/ListCardCarros";
import FormCarros from "./components/FormCarros";
import Home from "./components/Home";
import EditarCarro from "./components/EditarCarro"; // ✅ Importe o EditarCarro

// ✅ Componente wrapper para a página de lista
function ListaCarrosPage() {
  const [editandoCarroId, setEditandoCarroId] = useState<number | null>(null);

  return (
    <>
      {/* Lista de carros com função de edição */}
      <ListCardCarros 
        onEditarCarro={(carroId) => {
          console.log("✏️ Solicitando edição do carro ID:", carroId);
          setEditandoCarroId(carroId);
        }}
      />
      
      {/* Modal de edição (aparece quando editandoCarroId tem valor) */}
      {editandoCarroId && (
        <EditarCarro 
          carroId={editandoCarroId}
          onSucesso={() => {
            console.log("✅ Edição concluída com sucesso");
            setEditandoCarroId(null);
            window.location.reload(); // Recarrega para ver as mudanças
          }}
          onCancelar={() => {
            console.log("❌ Edição cancelada");
            setEditandoCarroId(null);
          }}
        />
      )}
    </>
  );
}

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        {/* ✅ Use o componente wrapper em vez do ListCardCarros direto */}
        <Route path="lista" element={<ListaCarrosPage />} />
        <Route path="cadastro" element={<FormCarros />} />
      </Route>
    </Routes>
  );
}
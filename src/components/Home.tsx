import ListCardCarros from "./ListCardCarros";

export default function Home() {
  return (
    <div className="w3-container">
      <div className="w3-padding-16">
        <h2>Carros em Destaque</h2>
        <p>Encontre o carro perfeito para você!</p>
        <ListCardCarros />
      </div>
    </div>
  );
}
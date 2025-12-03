import { useEffect, useState } from "react";
import CarroApiService from "../service/CarroApiService";
import BrandCard from "./BrandCard";

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

export default function Home() {
  const [brandCars, setBrandCars] = useState<Carro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sanitize = (s: string) =>
    encodeURIComponent(s.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, ""));

  useEffect(() => {
    setLoading(true);
    CarroApiService.listar()
      .then((cars: Carro[]) => {
        // keep the first car for each marca (brand)
        const byBrand = new Map<string, Carro>();
        cars.forEach((c) => {
          const brand = c.marca ?? "Unknown";
          if (!byBrand.has(brand)) byBrand.set(brand, c);
        });
        setBrandCars(Array.from(byBrand.values()));
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load carros:", err);
        setError("Falha ao carregar carros. Tente novamente mais tarde.");
        setBrandCars([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="w3-container w3-center w3-padding-64">
      <div className="loading-spinner"></div>
      <p className="w3-margin-top">Carregando marcas...</p>
    </div>
  );
  
  if (error) return (
    <div className="w3-container w3-center w3-padding-64">
      <div className="w3-panel w3-red w3-round">
        <h3>Erro!</h3>
        <p>{error}</p>
        <button 
          className="w3-button w3-white w3-round w3-margin-top"
          onClick={() => window.location.reload()}
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );

  return (
    <div className="w3-container">
      <div className="w3-padding-32">
        <div className="w3-center w3-margin-bottom">
          <h2 style={{
            background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            fontSize: '2.2rem',
            fontWeight: '700'
          }}>
            Carros por Marca
          </h2>
          <p className="w3-large" style={{ color: '#555' }}>
            Uma mostra por marca - Clique para ver os modelos
          </p>
        </div>

        <div className="w3-row">
          {brandCars.length > 0 ? (
            brandCars.map((car) => {
              const brandImage = `/brands/${sanitize(car.marca)}.jpg`;
              return <BrandCard key={car.id} brand={car.marca} image={brandImage} />;
            })
          ) : (
            <div className="w3-col s12 w3-center w3-padding-32">
              <p className="w3-large">Nenhuma marca encontrada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
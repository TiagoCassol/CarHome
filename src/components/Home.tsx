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
        setError("Falha ao carregar carros");
        setBrandCars([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="w3-container">Carregando...</div>;
  if (error) return <div className="w3-container w3-text-red">{error}</div>;

  return (
    <div className="w3-container">
      <div className="w3-padding-16">
        <h2>Carros por Marca</h2>
        <p>Uma mostra por marca</p>

        <div className="w3-row">
          {brandCars.map((car) => (
            // use brand as key only if unique; otherwise use car.id
            <BrandCard key={car.marca} brand={car.marca} image={car.imagem} />
          ))}
        </div>
      </div>
    </div>
  );
}
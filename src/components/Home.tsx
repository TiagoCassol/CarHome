// import { useEffect, useState } from "react";
// import CarroApiService from "../service/CarroApiService";
// import BrandCard from "./BrandCard";

// interface Carro {
//   id: string;
//   imagem: string;
//   modelo: string;
//   marca: string;
//   ano: number;
//   preco: number;
//   quilometragem?: number;
//   localizacao?: string;
// }

// export default function Home() {
//   const [brandCars, setBrandCars] = useState<Carro[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const sanitize = (s: string) =>
//     encodeURIComponent(s.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, ""));

//   useEffect(() => {
//     setLoading(true);
//     CarroApiService.listar()
//       .then((cars: Carro[]) => {
//         // keep the first car for each marca (brand)
//         const byBrand = new Map<string, Carro>();
//         cars.forEach((c) => {
//           const brand = c.marca ?? "Unknown";
//           if (!byBrand.has(brand)) byBrand.set(brand, c);
//         });
//         setBrandCars(Array.from(byBrand.values()));
//         setError(null);
//       })
//       .catch((err) => {
//         console.error("Failed to load carros:", err);
//         setError("Falha ao carregar carros");
//         setBrandCars([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <div className="w3-container">Carregando...</div>;
//   if (error) return <div className="w3-container w3-text-red">{error}</div>;

//   return (
//     <div className="w3-container">
//       <div className="w3-padding-16">
//         <h2>Carros por Marca</h2>
//         <p>Uma mostra por marca</p>

//         <div className="w3-row">
//           {brandCars.map((car) => {
//             const brandImage = `/brands/${sanitize(car.marca)}.jpg`;
//             return <BrandCard key={car.id} brand={car.marca} image={brandImage} />;
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import BrandCard from "./BrandCard";
import ListCardCarros from "./ListCardCarros";

export default function Home() {
  // 1. STATE: Which brand is currently selected? (null means none)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const brands = ["Toyota", "Ford", "Honda", "Chevrolet"]; // Your brand list

  return (
    <div className="w3-container">

      {/* SECTION 1: The Brand List */}
      <div className="w3-row-padding w3-margin-top">
        <h3>Navegue por Marca</h3>
        {brands.map((brandName) => (
          <BrandCard
            key={brandName}
            brand={brandName}
            // When clicked, update the state!
            onClick={(brand) => setSelectedBrand(brand)}
          />
        ))}
      </div>

      {/* SECTION 2: The Car List (Only shows if a brand is selected) */}
      {selectedBrand && (
        <div id="car-results" className="w3-row w3-margin-top w3-animate-bottom">
            <div className="w3-container w3-light-grey w3-padding">
                <button
                    className="w3-button w3-red w3-right"
                    onClick={() => setSelectedBrand(null)}
                >
                    &times; Fechar
                </button>
                <h3>Veículos: {selectedBrand}</h3>
            </div>

            {/* We pass the state to the list component */}
            {/* The component will see the prop change and call buscaPorMarca */}
            <ListCardCarros marca={selectedBrand} />
        </div>
      )}

    </div>
  );
}
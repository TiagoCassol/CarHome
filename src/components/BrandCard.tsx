import { Link } from "react-router-dom";

interface BrandCardProps {
  brand: string;
  image: string;
}

export default function BrandCard({ brand, image }: BrandCardProps) {
  return (
    <div className="w3-col l3 m6 s12 w3-padding">
      <Link to={`/lista?marca=${encodeURIComponent(brand)}`}>
        <div className="w3-card-4 brand-card">
          <div className="img-frame">
            <img 
              src={image} 
              alt={brand}
              className="brand-img"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/300x180/1e3c72/ffffff?text=" + brand;
              }}
            />
          </div>
          <div className="w3-container w3-center">
            <h3>{brand}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
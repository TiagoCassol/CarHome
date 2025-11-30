export default function BrandCard({
  brand,
}: {
  brand: string;
  image: string;
}) {
  // construct image path from brand name (lowercase + .jpg)
  const brandImagePath = `/brands/${brand.toLowerCase()}.jpg`;

  return (
    <article className="w3-col l3 m4 s6 w3-padding">
      <figure className="w3-card brand-card">
        <div className="img-frame" aria-hidden={false}>
          <img
            src={brandImagePath}
            alt={`${brand} - imagem representativa`}
            className="brand-img"
            loading="lazy"
            onError={(e) => {
              // fallback if image not found
              (e.target as HTMLImageElement).src = "/brands/default.jpg";
            }}
          />
        </div>
        <figcaption className="w3-container w3-center">
          <strong>{brand}</strong>
        </figcaption>
      </figure>
    </article>
  );
}
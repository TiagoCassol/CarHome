export default function BrandCard({
  brand,
  image,
}: {
  brand: string;
  image?: string; // optional prop
}) {
  const sanitize = (s: string) =>
    encodeURIComponent(s.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, ""));

  // handle absolute URLs, protocol-relative, absolute public paths, or fallback to /brands/<brand>.jpg
  const brandImagePath = image
    ? (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("//")
        ? image
        : image.startsWith("/")
        ? image
        : `/${image}`)
    : `/brands/${sanitize(brand)}.jpg`;

  return (
    <article className="w3-col l3 m4 s6 w3-padding" aria-label={`${brand} card`}>
      <figure className="w3-card brand-card">
        <div className="img-frame" aria-hidden={false}>
          <img
            src={brandImagePath}
            alt={`${brand} — imagem representativa`}
            className="brand-img"
            loading="lazy"
            onError={(e) => {
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
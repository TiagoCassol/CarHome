interface Carro {
    imagem: string;
    modelo: string;
    marca: string;
    ano: number;
    preco: number;
    localizacao?: string;
    quilometragem?: number;
}

interface CardCarroProps {
    carro: Carro;
}

export default function CardCarro({ carro }: CardCarroProps) {

    return (
        <div className="w3-col l4 m6 s12 w3-container w3-padding-16">
            <div className="w3-card">
                <div className="w3-container w3-center img-frame" aria-hidden={false}>
                    {/* standard image class */}
                    <img src={carro.imagem} alt={`${carro.marca} ${carro.modelo}`} className="card-img" />
                </div>

                <div className="w3-container">
                    <h5 style={{ marginTop: 8 }}>{carro.marca} {carro.modelo}</h5>
                    <p>Ano: {carro.ano} • KM: {carro.quilometragem ?? "N/A"}</p>
                    <p><strong>R$ {carro.preco.toLocaleString()}</strong></p>
                    <p>{carro.localizacao}</p>
                </div>
            </div>
        </div>
    )
}
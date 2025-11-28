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
                <div className="w3-container w3-center">
                    <img src={carro.imagem} style={{ width: "70%" }} alt={`${carro.marca} ${carro.modelo}`} />
                    <h5>{carro.marca} {carro.modelo}</h5>
                    <p className="w3-small">
                        <strong>Ano:</strong> {carro.ano}
                        {carro.quilometragem && (
                            <> | <strong>KM:</strong> {carro.quilometragem.toLocaleString()}</>
                        )}
                    </p>
                    {carro.localizacao && (
                        <p className="w3-small">
                            <strong>📍 {carro.localizacao}</strong>
                        </p>
                    )}
                    <h3 className="w3-blue">
                        {carro.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </h3>
                </div>
            </div>
        </div>
    )
}
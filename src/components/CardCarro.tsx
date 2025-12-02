interface Carro {
    id: number;
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
    onCarroComprado?: (carroId: number) => void;
}

export default function CardCarro({ carro, onCarroComprado }: CardCarroProps) {
    const comprarCarro = (id: number) => {
        console.log(`Comprando carro com ID: ${id}`);
        
        // Exibir confirmação
        if (window.confirm(`Deseja comprar o ${carro.marca} ${carro.modelo} por R$ ${carro.preco.toLocaleString()}?`)) {
            alert(`Compra do ${carro.marca} ${carro.modelo} confirmada! Entraremos em contato em breve.`);
            if (onCarroComprado) {
                onCarroComprado(id);
            }
        }
    }

    return (
        <div className="w3-col l4 m6 s12 w3-container w3-padding-16">
            <div className="w3-card">
                <div className="w3-container w3-center img-frame" aria-hidden={false}>
                    <img src={carro.imagem} alt={`${carro.marca} ${carro.modelo}`} className="card-img" />
                </div>

                <div className="w3-container">
                    <h5 style={{ marginTop: 8 }}>{carro.marca} {carro.modelo}</h5>
                    <p>Ano: {carro.ano} • KM: {carro.quilometragem ?? "N/A"}</p>
                    <p><strong>R$ {carro.preco.toLocaleString()}</strong></p>
                    <p>{carro.localizacao}</p>
                    <button 
                        className="btn-comprar" 
                        onClick={() => comprarCarro(carro.id)}
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '100%',
                            marginTop: '10px',
                            fontSize: '1em'
                        }}
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    )
}
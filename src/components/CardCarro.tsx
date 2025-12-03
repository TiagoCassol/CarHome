interface Carro {
    id: number;
    imagem: string;
    modelo: string;
    marca: string;
    ano: number;
    preco: number;
    quilometragem: number;
    cor: string;
    descricao?: string;
    vendedor: number;
    localizacao?: string; 
}

interface CardCarroProps {
    carro: Carro;
    onCarroComprado?: (carroId: number) => void;
    usuarioLogadoId?: number; // ← Adicione esta prop
    onEditar?: (carroId: number) => void; // ← Nova prop
}

export default function CardCarro({ carro, onCarroComprado, usuarioLogadoId, onEditar }: CardCarroProps) {
    console.log("=== DEBUG CardCarro ===");
    console.log("Carro ID:", carro.id);
    console.log("Carro marca/modelo:", carro.marca, carro.modelo);
    console.log("Carro.vendedor:", carro.vendedor, "Tipo:", typeof carro.vendedor);
    console.log("usuarioLogadoId:", usuarioLogadoId, "Tipo:", typeof usuarioLogadoId);
    
    const isDono = usuarioLogadoId !== undefined && 
                   carro.vendedor !== undefined && 
                   usuarioLogadoId === carro.vendedor;

    console.log("isDono calculado:", isDono);
    console.log("onEditar existe?", !!onEditar);
    console.log("Botão deve aparecer?", isDono && !!onEditar);
    console.log("=== FIM DEBUG ===");
    
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
                    
                    <div className="w3-row">
                        {/* Botão Comprar */}
                        <div className="w3-half">
                            <button 
                                className="btn-comprar" 
                                onClick={() => comprarCarro(carro.id)}
                                style={{
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    width: '100%',
                                    fontSize: '1em'
                                }}
                            >
                                Comprar
                            </button>
                        </div>
                        
                        {/* Botão Editar (só aparece se for dono) */}
                        {isDono && onEditar && (
                            <div className="w3-half">
                                <button className="btn-editar" 
                                    onClick={() => onEditar(carro.id)}
                                    style={{
                                        backgroundColor: '#ffc107',
                                        color: 'black',
                                        border: 'none',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        width: '100%',
                                        cursor: 'pointer'
                                    }}>
                                    ✏️ Editar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
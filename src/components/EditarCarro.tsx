// src/components/EditarCarro.tsx
import { useState, useEffect, type FormEvent } from "react";
import CarroApiService from "../service/CarroApiService";

interface Carro {
    id: number;
    marca: string;
    modelo: string;
    ano: number;
    preco: number;
    quilometragem: number;
    cor: string;
    descricao: string;
    imagem: string;
}

interface EditarCarroProps {
    carroId: number;
    onSucesso: () => void;
    onCancelar: () => void;
}

export default function EditarCarro({ carroId, onSucesso, onCancelar }: EditarCarroProps) {
    const [carro, setCarro] = useState<Carro | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        // Busca os dados do carro
        fetch(`http://localhost:3000/api/carros/${carroId}`)
            .then(res => res.json())
            .then(data => {
                setCarro(data);
                setCarregando(false);
            });
    }, [carroId]);

    async function salvarEdicao(event: FormEvent) {
        event.preventDefault();
        if (!carro) return;

        try {
            await CarroApiService.atualizar(carroId, {
                marca: carro.marca,
                modelo: carro.modelo,
                ano: carro.ano,
                preco: carro.preco,
                quilometragem: carro.quilometragem,
                cor: carro.cor,
                descricao: carro.descricao,
                imagem: carro.imagem
            });

            alert("Carro atualizado com sucesso!");
            onSucesso();
        } catch (error: any) {
            alert("Erro ao atualizar: " + error.message);
        }
    }

    if (carregando) return <p>Carregando...</p>;
    if (!carro) return <p>Carro não encontrado</p>;

    return (
        <div className="w3-modal" style={{ display: 'block' }}>
            <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={{ maxWidth: '600px' }}>
                <div className="w3-container w3-padding">
                    <span onClick={onCancelar} className="w3-button w3-display-topright">&times;</span>
                    <h3>Editar Carro: {carro.marca} {carro.modelo}</h3>

                    <form onSubmit={salvarEdicao}>
                        {/* Campos iguais ao FormCarros, mas com valores do carro */}
                        <div className="w3-row-padding">
                            <div className="w3-half">
                                <label>Marca:</label>
                                <input className="w3-input w3-border" 
                                    value={carro.marca}
                                    onChange={e => setCarro({...carro, marca: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="w3-half">
                                <label>Modelo:</label>
                                <input className="w3-input w3-border" 
                                    value={carro.modelo}
                                    onChange={e => setCarro({...carro, modelo: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="w3-row-padding">
                            <div className="w3-third">
                                <label>Ano:</label>
                                <input className="w3-input w3-border" type="number"
                                    value={carro.ano}
                                    onChange={e => setCarro({...carro, ano: +e.target.value})}
                                    required
                                />
                            </div>
                            <div className="w3-third">
                                <label>Preço:</label>
                                <input className="w3-input w3-border" type="number"
                                    value={carro.preco}
                                    onChange={e => setCarro({...carro, preco: +e.target.value})}
                                    required
                                />
                            </div>
                            <div className="w3-third">
                                <label>Cor:</label>
                                <input className="w3-input w3-border"
                                    value={carro.cor}
                                    onChange={e => setCarro({...carro, cor: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <label>Descrição:</label>
                        <textarea className="w3-input w3-border" rows={4}
                            value={carro.descricao}
                            onChange={e => setCarro({...carro, descricao: e.target.value})}
                        />

                        <div className="w3-margin-top">
                            <button type="submit" className="w3-button w3-green">
                                Salvar Alterações
                            </button>
                            <button type="button" onClick={onCancelar} 
                                className="w3-button w3-gray w3-margin-left">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
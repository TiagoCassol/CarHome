import { useState } from "react";
import type { FormEvent } from "react";
import CarroApiService from "../service/CarroApiService";

export default function FormCarros() {
    const [modelo, setModelo] = useState("");
    const [marca, setMarca] = useState("");
    const [ano, setAno] = useState(new Date().getFullYear());
    const [preco, setPreco] = useState(0);
    const [quilometragem, setQuilometragem] = useState(0);
    const [cor, setCor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState("");
    const [enviando, setEnviando] = useState(false);

    // Verifica se o usuário está logado
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario") || "null");

    function cadastrarCarro(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        if (!usuarioLogado) {
            alert("⚠️ Você precisa fazer login para anunciar um carro!");
            return;
        }

        setEnviando(true);
        
        // ✅ Agora não precisa enviar vendedor - o backend pega do token
        CarroApiService.inserir({
            modelo: modelo,
            marca: marca,
            ano: ano,
            preco: preco,
            quilometragem: quilometragem,
            cor: cor,
            descricao: descricao,
            imagem: imagem || "https://images.unsplash.com/photo-1563720223480-8ddab2319e1a?w=400"
        })
        .then((novoCarro) => {
            alert(`✅ Carro ${marca} ${modelo} anunciado com sucesso!`);
            console.log('Carro criado:', novoCarro);
            
            // Reset form
            setModelo('');
            setMarca('');
            setAno(new Date().getFullYear());
            setPreco(0);
            setQuilometragem(0);
            setCor('');
            setDescricao('');
            setImagem('');
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("❌ Erro ao cadastrar carro: " + error.message);
        })
        .finally(() => {
            setEnviando(false);
        });
    }

    // Se não estiver logado, mostra mensagem
    if (!usuarioLogado) {
        return (
            <div className="w3-container w3-padding w3-center">
                <div className="w3-card w3-padding">
                    <h3>🔒 Acesso Restrito</h3>
                    <p>Você precisa fazer login para anunciar um carro.</p>
                    <p>Use o botão de login no canto superior direito.</p>
                    <div className="w3-margin-top">
                        <i className="fa fa-lock w3-xxlarge w3-text-blue"></i>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={cadastrarCarro} className="w3-container w3-padding">
            <h2>🚗 Anunciar Carro</h2>
            <p className="w3-text-gray">
                <i className="fa fa-user"></i> Anunciando como: <strong>{usuarioLogado.nome}</strong> ({usuarioLogado.email})
            </p>

            <div className="w3-row-padding">
                <div className="w3-half">
                    <label>Marca:</label>
                    <input className="w3-input w3-border" type="text" name="marca" value={marca}
                        onChange={(ev) => setMarca(ev.target.value)} required 
                        disabled={enviando} />
                </div>

                <div className="w3-half">
                    <label>Modelo:</label>
                    <input className="w3-input w3-border" type="text" name="modelo" value={modelo}
                        onChange={(ev) => setModelo(ev.target.value)} required 
                        disabled={enviando} />
                </div>
            </div>
            <br />

            <div className="w3-row-padding">
                <div className="w3-third">
                    <label>Ano:</label>
                    <input className="w3-input w3-border" type="number" name="ano" value={ano}
                        onChange={(ev) => setAno(+ev.target.value)} min="1990" 
                        max={new Date().getFullYear() + 1} required 
                        disabled={enviando} />
                </div>

                <div className="w3-third">
                    <label>Preço (R$):</label>
                    <input className="w3-input w3-border" type="number" name="preco" value={preco}
                        onChange={(ev) => setPreco(+ev.target.value)} min="0" step="100" required 
                        disabled={enviando} />
                </div>

                <div className="w3-third">
                    <label>Quilometragem:</label>
                    <input className="w3-input w3-border" type="number" name="quilometragem" value={quilometragem}
                        onChange={(ev) => setQuilometragem(+ev.target.value)} min="0" required 
                        disabled={enviando} />
                </div>
            </div>
            <br />

            <div className="w3-row-padding">
                <div className="w3-half">
                    <label>Cor:</label>
                    <input className="w3-input w3-border" type="text" name="cor" value={cor}
                        onChange={(ev) => setCor(ev.target.value)} placeholder="Ex: preto, prata, azul" required 
                        disabled={enviando} />
                </div>

                <div className="w3-half">
                    <label>Imagem URL (opcional):</label>
                    <input className="w3-input w3-border" type="text" name="imagem" value={imagem}
                        onChange={(ev) => setImagem(ev.target.value)} 
                        placeholder="https://exemplo.com/imagem.jpg"
                        disabled={enviando} />
                    <small className="w3-text-gray">Deixe em branco para usar imagem padrão</small>
                </div>
            </div>
            <br />

            <label>Descrição:</label>
            <textarea className="w3-input w3-border" name="descricao" value={descricao}
                onChange={(ev) => setDescricao(ev.target.value)} rows={4} 
                placeholder="Descreva o estado do carro, opcionais, histórico..."
                disabled={enviando}></textarea>
            <br />

            <button 
                className="w3-button w3-blue w3-block" 
                type="submit"
                disabled={enviando}
            >
                {enviando ? (
                    <>
                        <span className="w3-spinner w3-small"></span> Anunciando...
                    </>
                ) : (
                    "📢 Anunciar Carro"
                )}
            </button>
        </form>
    );
}
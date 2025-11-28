import { useState, type ChangeEvent, type FormEvent } from "react";
import CarroApiService from "../service/CarroApiService";

export default function FormCarros() {
    const [modelo, setModelo] = useState("");
    const [marca, setMarca] = useState("");
    const [ano, setAno] = useState(new Date().getFullYear());
    const [preco, setPreco] = useState(0);
    const [quilometragem, setQuilometragem] = useState(0);
    const [localizacao, setLocalizacao] = useState("");
    const [descricao, setDescricao] = useState("");

    function cadastrarCarro(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();        
        CarroApiService.inserir({
            modelo: modelo,
            marca: marca,
            ano: ano,
            preco: preco,
            quilometragem: quilometragem,
            localizacao: localizacao,
            descricao: descricao,
            imagem: "carro-default.jpg", 
            combustivel: "flex", 
            cambio: "manual" 
        }).then(() => {
            alert(`Carro ${marca} ${modelo} anunciado com sucesso!`);
            setModelo('');
            setMarca('');
            setAno(new Date().getFullYear());
            setPreco(0);
            setQuilometragem(0);
            setLocalizacao('');
            setDescricao('');
        }).catch(error => {
            alert("Erro ao cadastrar carro: " + error.message);
        });
    }

    return (
        <form onSubmit={cadastrarCarro} className="w3-container w3-padding">
            <h2>Anunciar Carro</h2>
            
            <div className="w3-row-padding">
                <div className="w3-half">
                    <label>Marca:</label>
                    <input className="w3-input w3-border" type="text" name="marca" value={marca}
                        onChange={(ev) => setMarca(ev.target.value)} required />
                </div>
                
                <div className="w3-half">
                    <label>Modelo:</label>
                    <input className="w3-input w3-border" type="text" name="modelo" value={modelo}
                        onChange={(ev) => setModelo(ev.target.value)} required />
                </div>
            </div>
            <br />

            <div className="w3-row-padding">
                <div className="w3-third">
                    <label>Ano:</label>
                    <input className="w3-input w3-border" type="number" name="ano" value={ano}
                        onChange={(ev) => setAno(+ev.target.value)} min="1990" max={new Date().getFullYear() + 1} required />
                </div>
                
                <div className="w3-third">
                    <label>Preço (R$):</label>
                    <input className="w3-input w3-border" type="number" name="preco" value={preco}
                        onChange={(ev) => setPreco(+ev.target.value)} min="0" step="100" required />
                </div>
                
                <div className="w3-third">
                    <label>Quilometragem:</label>
                    <input className="w3-input w3-border" type="number" name="quilometragem" value={quilometragem}
                        onChange={(ev) => setQuilometragem(+ev.target.value)} min="0" />
                </div>
            </div>
            <br />

            <label>Localização:</label>
            <input className="w3-input w3-border" type="text" name="localizacao" value={localizacao}
                onChange={(ev) => setLocalizacao(ev.target.value)} placeholder="Cidade, Estado" />
            <br />

            <label>Descrição:</label>
            <textarea className="w3-input w3-border" name="descricao" value={descricao}
                onChange={(ev) => setDescricao(ev.target.value)} rows={4} placeholder="Descreva o estado do carro, opcionais, histórico..."></textarea>
            <br />

            <input className="w3-button w3-blue w3-block" type="submit" value="Anunciar Carro" />
        </form>
    )
}
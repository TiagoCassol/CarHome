import { useEffect, useState } from "react";
import CardCarro from "./CardCarro";
import CarroApiService from "../service/CarroApiService";

interface Carro {
    id: string;
    imagem: string;
    modelo: string;
    marca: string;
    ano: number;
    preco: number;
    quilometragem?: number;
    localizacao?: string;
}


export default function ListCardCarros() {
    const [listaCarros, setListaCarros] = useState([]);

    useEffect(() => {
        CarroApiService.listar().then(
            carros => setListaCarros(carros)
        )
    }, [])

    return (
        listaCarros.map((carro:Carro) => 
            <CardCarro key={carro.id} carro={carro} />
        )    
    )
}
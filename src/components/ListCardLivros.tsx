import { useEffect, useState } from "react";
import CardLivro from "./CardLivro";
import LivroApiService from "../service/LivroApiService";

interface Livro {
    id: string;
    imagem: string;
    titulo: string;
    preco: number;
}

export default function ListCardLivros() {
    const [listaLivros, setListaLivros] = useState([]);

    useEffect(() => {
        LivroApiService.listar().then(
            livros => setListaLivros(livros)
        )
    }, [])

    return (
        listaLivros.map((livro:Livro) => 
            <CardLivro key={livro.id} livro={livro} />
        )    
    )
}
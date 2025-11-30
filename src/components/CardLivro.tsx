interface Livro {
    imagem: string;
    titulo: string;
    preco: number;
}

interface CardLivroProps {
    livro: Livro;
}

export default function CardLivro ({ livro }: CardLivroProps) {

    return (
        <div className="w3-col l4 m6 s12 w3-container w3-padding-16">
            <div className="w3-card">
                <div className="w3-container w3-center img-frame">
                    <img src={livro.imagem} style={{ width: "70%" }} className="card-thumb" alt={livro.titulo} />
                    <h5>{livro.titulo}</h5>
                    <p><strong>R$ {livro.preco.toLocaleString()}</strong></p>
                </div>
            </div>
        </div>
    )
}
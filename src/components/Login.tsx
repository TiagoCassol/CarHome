// src/components/Login.tsx
import { useState, type FormEvent } from "react";

interface LoginProps {
    onLogin: (usuario: any, token: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function fazerLogin(event: FormEvent) {
        event.preventDefault();
        setCarregando(true);

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                onLogin(data.usuario, data.token);
                alert(`Bem-vindo, ${data.usuario.nome}!`);
            } else {
                alert("Erro no login");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro de conexão com o servidor");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="w3-container w3-padding">
            <h2>Login / Registro</h2>
            <p>Digite seu nome e email para continuar</p>
            
            <form onSubmit={fazerLogin} className="w3-card w3-padding">
                <div className="w3-section">
                    <label>Nome:</label>
                    <input className="w3-input w3-border" 
                        type="text" 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome completo"
                        required
                    />
                </div>

                <div className="w3-section">
                    <label>Email:</label>
                    <input className="w3-input w3-border" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                <button 
                    className="w3-button w3-blue w3-block" 
                    type="submit"
                    disabled={carregando}
                >
                    {carregando ? "Entrando..." : "Entrar / Registrar"}
                </button>
            </form>
        </div>
    );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login"; 
export default function Menu() {
    const classMenuMobile = "w3-bar-block w3-large w3-black w3-hide w3-hide-large w3-hide-medium";

    const [selecionado, setSelecionado] = useState(false);
    const [mostrarLogin, setMostrarLogin] = useState(false); 

    const onClickMenu = () => {
        setSelecionado(!selecionado);
    }

    const handleLoginSuccess = (usuario: any, token: string) => {
        setMostrarLogin(false); 
        localStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.setItem("token", token);
    }

    return (
        <div className="w3-top w3-margin-bottom">
            <nav className="w3-bar w3-large w3-black">
                <button 
                    className="w3-bar-item w3-button w3-hide-large w3-hide-medium" 
                    onClick={onClickMenu}
                    style={{ background: 'none', border: 'none', color: 'inherit' }}
                >
                    &#9776;
                </button>
                
                {/* Ícone Home */}
                <Link to="/" className="w3-bar-item w3-button">
                    <i className="fa fa-home w3-xlarge"></i>
                </Link>
                
                {/* Links de navegação */}
                <Link to="/" className="w3-bar-item w3-button w3-hide-small">Home</Link>
                <Link to="/lista" className="w3-bar-item w3-button w3-hide-small">Carros</Link>
                <Link to="/cadastro" className="w3-bar-item w3-button w3-hide-small">Anuncie</Link>
                
                {/* Botão Login (direita) */}
                <div className="w3-right">
                    <button 
                        className="w3-bar-item w3-button"
                        onClick={() => setMostrarLogin(true)}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            font: 'inherit',
                            padding: '8px 16px'
                        }}
                        title="Fazer Login"
                    >
                        <i className="fa fa-user-circle w3-xlarge"></i>
                    </button>
                </div>
            </nav>

            {/* Menu Mobile */}
            <nav id="menu-mobile" className={classMenuMobile + (selecionado ? " w3-show" : "")}>
                <Link to="/" className="w3-bar-item w3-button" onClick={() => setSelecionado(false)}>Home</Link>
                <Link to="/lista" className="w3-bar-item w3-button" onClick={() => setSelecionado(false)}>Carros</Link>
                <Link to="/cadastro" className="w3-bar-item w3-button" onClick={() => setSelecionado(false)}>Anuncie</Link>
            </nav>
            {mostrarLogin && (
                <div className="w3-modal" style={{ display: 'block', zIndex: 1000 }}>
                    <div className="w3-modal-content w3-card-4 w3-animate-zoom" 
                         style={{ maxWidth: '500px', margin: '100px auto' }}>
                        <div className="w3-container">
                            <span onClick={() => setMostrarLogin(false)} 
                                  className="w3-button w3-display-topright">&times;</span>
                            <Login onLogin={handleLoginSuccess} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
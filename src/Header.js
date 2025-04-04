import { useNavigate } from "react-router-dom";
import logo from "./image/image.png";
import "./Style.css";

function Header() {
  const navigate = useNavigate();

  return (
    <header>
    <img src={logo} alt="Controle patrimonial logo" /> 
    <h2 class="ControlePatrimonial">CONTROLE PATRIMONIAL</h2>
    <nav>
        <button class="HeaderButton" onClick={() => navigate("/")}>Cadastrar</button>
        <button class="HeaderButton" onClick={() => navigate("/buscar")}>Buscar</button>
        <button class="HeaderButton" onClick={() => navigate("/transferir")}>Transferir</button>
    </nav>
    </header>
  );
}

export default Header;
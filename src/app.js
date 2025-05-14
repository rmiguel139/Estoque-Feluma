import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cadastro from "./rotas/cadastro";
import Buscar from "./rotas/buscar"
import Transferir from "./rotas/transferir"
// aqui ficam as rotas onde cada página será renderizada
function App (){
    return (
        <Router>
          <Routes>
            <Route path="/" element={<Cadastro />} />
            <Route path="/transferir" element={<Transferir />} />
            <Route path="/buscar" element={<Buscar />} />
          </Routes>
        </Router>
      );

}

export default App;

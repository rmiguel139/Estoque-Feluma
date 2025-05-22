import { useState } from "react";
import Header from "../Header";
import buttonImage from "../image/button.png";

function Buscar() {
  const [tipo, setTipo] = useState("");
  const [numero, setNumero] = useState("");
  const [setor, setSetor] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Só envia parâmetros que estiverem preenchidos
    const queryParams = new URLSearchParams();
    if (tipo) queryParams.append("tipo_patrimonio", tipo);
    if (numero) queryParams.append("numero_patrimonio", numero);
    if (setor) queryParams.append("setor", setor);

    try {
      const response = await fetch(`http://localhost:3000/patrimonios?${queryParams.toString()}`);
      const data = await response.json();
      setResultados(data);
    } catch (error) {
      alert("Erro de conexão com o servidor.");
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <h1 className="Buscarh1">Buscar Patrimônio</h1><br/>
      <form className="main" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Selecione o tipo"
          list="Equipamento"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
         <datalist id="Equipamento">
            <option value="Monitor"></option>
            <option value="Computador"></option>
            <option value="Notebook"></option>
            <option value="Tablet"></option>
            <option value="Nobreak"></option>
            <option value="Outro"></option>
          </datalist>

        <input
          type="text"
          placeholder="Patrimônio"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />

        <input
          type="text"
          placeholder="Setor"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
        />

        <button className="button" type="submit">
          <img src={buttonImage} alt="Buscar" className="buttonImg" />
        </button>
      </form>

      {/* Exibição dos resultados */}

      <h2 className="PatrimoniosH2">Patrimônios</h2>
      <div className="tabelaPatrimonios">
        <div className="linhaPatrimonio ">
          <div className="cabecalho">Tipo</div>
          <div className="cabecalho">Número</div>
          <div className="cabecalho">Setor</div>
        </div>
            {resultados.map((p) => (
            <div className="linhaPatrimonio" key={p.id}>
            <div className="coluna">{p.tipo_patrimonio}</div>
            <div className="coluna">{p.numero_patrimonio}</div>
            <div className="coluna">{p.setor}</div>
          </div>
            ))}
      </div>
    </div>
  );
}

export default Buscar;
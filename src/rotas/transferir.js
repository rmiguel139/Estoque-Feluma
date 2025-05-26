import { useState } from "react";
import Header from "../Header";
import buttonImage from "../image/button.png";

function Transferir() {
  const [tipo, setTipo] = useState("");
  const [numero, setNumero] = useState("");
  const [setor, setSetor] = useState("");
  const [resultados, setResultados] = useState([]);
  const [novoSetor, setNovoSetor] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  const handleTransferir = async (numero_patrimonio) => {
    const novo = novoSetor[numero_patrimonio];
    if (!novo) {
      alert("Informe o novo setor antes de transferir.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/patrimonios`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numero_patrimonio, setor: novo }),
      });

      if (response.ok) {
        alert("Transferência realizada com sucesso!");
        setNovoSetor("");// limpa o campo
        handleSubmit(new Event("submit"));

      } else {
        alert("Erro ao transferir patrimônio.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <h1 className="Transferirh1">Transferir Patrimônio</h1><br />
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

      <h2 className="PatrimoniosH2">Patrimônios</h2>
      <div className="tabelaPatrimonios">
        <div className="linhaPatrimonio">
          <div className="cabecalho">Tipo</div>
          <div className="cabecalho">Patrimônio</div>
          <div className="cabecalho">Setor</div>
          <div className="cabecalho">Novo Setor</div>
          <div className="cabecalho"></div>
        </div>

        {resultados.map((p) => (
          <div className="linhaPatrimonio" key={p.numero_patrimonio}>
            <div className="coluna">{p.tipo_patrimonio}</div>
            <div className="coluna">{p.numero_patrimonio}</div>
            <div className="coluna colunaSetor">{p.setor}</div>
            <div className="coluna">
              <input
                type="text"
                placeholder="Novo setor"
                value={novoSetor[p.numero_patrimonio] || ""}
                onChange={(e) =>
                  setNovoSetor({
                    ...novoSetor,
                    [p.numero_patrimonio]: e.target.value,
                  })
                }
              />
            </div>
            <div className="coluna">
              <button onClick={() => handleTransferir(p.numero_patrimonio)}>Transferir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transferir;
import { useState } from "react";
import buttonImage from "./image/button.png";

function Main () {
  const [tipo, setTipo] = useState("");
  const [numero, setNumero] = useState("");
  const [setor, setSetor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = {
      tipo_patrimonio: tipo,
      numero_patrimonio: numero,
      setor: setor
    };
    try {
      const response = await fetch("http://localhost:3000/patrimonios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      if (response.ok) {
        alert("Patrimônio cadastrado com sucesso!");
        // limpa os campos
        setTipo("");
        setNumero("");
        setSetor("");
      } else {
        const erro = await response.json();
        alert("Erro ao cadastrar: " + erro.error || response.statusText);
      }
    } catch (error) {
      alert("Erro de conexão com o servidor.");
      console.error(error);
    }
  };
    return(
    <div>
        <br/>
        <form className="main" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Selecione o tipo"
          list="Equipamento"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
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
          required
        />

        <input
          type="text"
          placeholder="Setor"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          required
        />
        <button class="button">
        <img src={buttonImage} alt="" class="buttonImg" />  
        </button>
        </form>
    </div>
    )
} 
export default Main;

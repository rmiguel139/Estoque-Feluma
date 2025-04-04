import buttonImage from "./image/button.png";

function Main () {
    return(
    <div>
        <br/>
        <section class="main">
          <input type="text" placeholder="Selecione o tipo" list="Equipamento"/>
          <datalist id="Equipamento">
            <option value="Monitor"></option>
            <option value="Computador"></option>
            <option value="Notebook"></option>
            <option value="Tablet"></option>
            <option value="Nobreak"></option>
            <option value="Outro"></option>
          </datalist>
            <input type="text" name="" id=""  placeholder="Patrimônio" />
            <input type="text" name="" id=""  placeholder="Setor"/>
            <button class="button">
              <img src={buttonImage} alt="" class="buttonImg" />  
            </button>
        </section>
    </div>
    )
} 
export default Main;

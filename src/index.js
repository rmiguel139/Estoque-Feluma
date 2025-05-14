import React from "react"; // carrega o react 
import ReactDOM from "react-dom/client";
import App from "./app";
// ponto de partida do início da aplicação e onde será renderizado o app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Liberação de CORS para o React (porta 3001)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo que define os dados esperados no corpo da requisição
class Patrimonio(BaseModel):
    numero_patrimonio: str
    setor: str
    tipo_patrimonio: str

# Simulando um "banco de dados"
patrimonios = []

# Rota POST para cadastrar patrimônio
@app.post("/patrimonios")
def criar_patrimonio(p: Patrimonio):
    patrimonios.append(p.dict())
    return {"mensagem": "Patrimônio cadastrado com sucesso", "dados": p}
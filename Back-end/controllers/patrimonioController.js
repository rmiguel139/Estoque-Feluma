const PatrimonioService = require('../services/patrimonioServices');

async function listar(req, res) {
    const filtros = req.query;
    const patrimonios = await PatrimonioService.listarPatrimonios(filtros);
    return res.json(patrimonios);
}

async function criar(req, res) {
    const { numero_patrimonio, setor, tipo_patrimonio } = req.body;
    try {
        const cadastrar = await PatrimonioService.criarPatrimonio({ numero_patrimonio, setor, tipo_patrimonio });
        return res.status(201).json(cadastrar);
    } catch (error) {
        if (error.message === 'Patrimônio já cadastrado') {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'erro ao criar patrimonio' });
    }
    
}

async function transferir(req, res) {
    const { numero_patrimonio, setor } = req.body;
  
    if (!numero_patrimonio || !setor) {
      return res.status(400).json({ error: "Número do patrimônio e novo setor são obrigatórios." });
    }
  
    try {
      const patrimonio = await PatrimonioService.transferirPorNumero(numero_patrimonio, setor);
      if (!patrimonio) {
        return res.status(404).json({ error: "Patrimônio não encontrado." });
      }
      return res.json(patrimonio);
    } catch (error) {
      console.error("Erro ao transferir:", error);
      return res.status(500).json({ error: "Erro ao transferir patrimônio." });
    }
  }
  

module.exports = {
    listar,
    criar,
    transferir
};
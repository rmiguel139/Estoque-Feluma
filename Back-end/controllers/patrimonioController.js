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

module.exports = {
    listar,
    criar
};
const { Patrimonio } = require('../../models');

async function listarPatrimonios() {
    return await Patrimonio.findAll();
}

async function criarPatrimonio(data) {
    const { numero_patrimonio } = data;
    const existente = await Patrimonio.findOne({ where: { numero_patrimonio } });

    if (existente) {
        throw new Error('Patrimônio já cadastrado');
    }
    return await Patrimonio.create(data);
}
  
  module.exports = {
    listarPatrimonios,
    criarPatrimonio,
};
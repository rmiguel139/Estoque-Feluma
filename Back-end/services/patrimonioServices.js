const { Patrimonio } = require('../../models');
const { Op } = require('sequelize');

async function listarPatrimonios(filtros = {}) {
    const where = {};

    if (filtros.tipo_patrimonio) {
        where.tipo_patrimonio = filtros.tipo_patrimonio;
    }
    if (filtros.numero_patrimonio) {
        where.numero_patrimonio = filtros.numero_patrimonio;
    }
    if (filtros.setor) {
        where.setor = filtros.setor;
    }
    //aplica um filtro mais flexível nos campos, usando o LIKE para buscar termos parciais (ex: digitar "adm" e retornar "Administração"), o Sequelize com Op.like faz isso de forma simples.
    if (filtros.tipo_patrimonio) {
        where.tipo_patrimonio = { [Op.like]: `%${filtros.tipo_patrimonio}%` };
    }
      
    if (filtros.numero_patrimonio) {
        where.numero_patrimonio = { [Op.like]: `%${filtros.numero_patrimonio}%` };
    }

    if (filtros.setor) {
        where.setor = { [Op.like]: `%${filtros.setor}%` };
    }

    return await Patrimonio.findAll({ where });
}
async function criarPatrimonio(data) {
    const { numero_patrimonio } = data;
    const existente = await Patrimonio.findOne({ where: { numero_patrimonio } });

    if (existente) {
        throw new Error('Patrimônio já cadastrado');
    }
    return await Patrimonio.create(data);
}


async function transferirPorNumero(numero_patrimonio, novoSetor) {
    const patrimonio = await Patrimonio.findOne({ where: { numero_patrimonio } });
  
    if (!patrimonio) return null;
  
    patrimonio.setor = novoSetor;
    await patrimonio.save();
  
    return patrimonio;
  }
  
  
  module.exports = {
    transferirPorNumero,
    listarPatrimonios,
    criarPatrimonio
};
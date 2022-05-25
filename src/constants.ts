/* eslint-disable jest/require-hook */
// eslint-disable-next-line import/no-import-module-exports
import * as schemas from './schemas';

const map = new Map();
// MAP QUE CONTIENE CADA NOMBRE DE CREDENCIAL CON LA ULTIMA VERSION DE SCHEMA EXISTENTE
map.set('Sancor Salud', schemas.benefit.semillaSancorSalud.v2);
map.set('Sembrando - Familiar', schemas.benefit.semillaSembFamiliar.v1);
map.set('Sembrando - Titular', schemas.benefit.semillaSembTitular.v2);
map.set('Sancor Salud', schemas.benefit.semillaSancorSalud.v2);
map.set('Semillas Crediticia', schemas.finance.semillaCrediticia.v2);
map.set('Identidad Familiar', schemas.finance.semillaIdFamiliar.v1);
map.set('Identidad Titular', schemas.finance.semillaIdTitular.v1);
map.set('Email', schemas.identity.emailMain.v1);
map.set('Domicilio Legal', schemas.identity.legalAddress.v2);
map.set('Phone', schemas.identity.mobilePhone.v1);
map.set('Datos Personales', schemas.identity.nationalId);
map.set('Vivienda', schemas.livingPlace.livingPlace.v2);
map.set('Emprendimiento', schemas.work.semillaEmprendimiento.v1);

module.exports = { map };

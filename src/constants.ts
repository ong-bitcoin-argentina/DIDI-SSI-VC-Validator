/* eslint-disable jest/require-hook */
// eslint-disable-next-line import/no-import-module-exports
import * as schemas from './schemas';

const schemasMap = new Map();
// MAP QUE CONTIENE CADA NOMBRE DE CREDENCIAL CON LA ULTIMA VERSION DE SCHEMA EXISTENTE
schemasMap.set('Sancor Salud', schemas.benefit.semillaSancorSalud.v2);
schemasMap.set('Sembrando - Familiar', schemas.benefit.semillaSembFamiliar.v1);
schemasMap.set('Sembrando - Titular', schemas.benefit.semillaSembTitular.v2);
schemasMap.set('Sancor Salud', schemas.benefit.semillaSancorSalud.v2);
schemasMap.set('Semillas Crediticia', schemas.finance.semillaCrediticia.v2);
schemasMap.set('Identidad Familiar', schemas.finance.semillaIdFamiliar.v1);
schemasMap.set('Identidad Titular', schemas.finance.semillaIdTitular.v1);
schemasMap.set('Email', schemas.identity.emailMain.v1);
schemasMap.set('Domicilio Legal', schemas.identity.legalAddress.v2);
schemasMap.set('Phone', schemas.identity.mobilePhone.v1);
schemasMap.set('Datos Personales', schemas.identity.nationalId);
schemasMap.set('Vivienda', schemas.livingPlace.livingPlace.v2);
schemasMap.set('Emprendimiento', schemas.work.semillaEmprendimiento.v1);

module.exports = { schemasMap };

/* eslint-disable jest/require-hook */
// eslint-disable-next-line import/no-import-module-exports
import * as schemas from './schemas';

const schemasByName = new Map();
// MAP QUE CONTIENE CADA NOMBRE DE CREDENCIAL CON LA ULTIMA VERSION DE SCHEMA EXISTENTE
schemasByName.set('Sancor Salud', schemas.benefit.semillaSancorSalud.v2);
schemasByName.set(
  'Sembrando - Familiar',
  schemas.benefit.semillaSembFamiliar.v1,
);
schemasByName.set('Sembrando - Titular', schemas.benefit.semillaSembTitular.v2);
schemasByName.set('Sancor Salud', schemas.benefit.semillaSancorSalud.v2);
schemasByName.set('Semillas Crediticia', schemas.finance.semillaCrediticia.v2);
schemasByName.set('Identidad Familiar', schemas.finance.semillaIdFamiliar.v1);
schemasByName.set('Identidad Titular', schemas.finance.semillaIdTitular.v1);
schemasByName.set('Email', schemas.identity.emailMain.v1);
schemasByName.set('Domicilio Legal', schemas.identity.legalAddress.v2);
schemasByName.set('Phone', schemas.identity.mobilePhone.v1);
schemasByName.set('Datos Personales', schemas.identity.nationalId);
schemasByName.set('Vivienda', schemas.livingPlace.livingPlace.v2);
schemasByName.set('Emprendimiento', schemas.work.semillaEmprendimiento.v1);

module.exports = { schemasByName };

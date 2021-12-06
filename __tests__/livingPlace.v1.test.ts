const { createSemicolonClassElement } = require('typescript');

const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const { validateCredential } = require('../src/validator');
import { livingPlace } from '../src/schemas/livingPlace';

const valid = {
  iat: 1626782449,
  sub: 'did:ethr:16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Vivienda': {
        category: 'livingPlace',
        preview: {
          type: 2,
          fields: [
            'Tipo de Vivienda',
            'Tipo de Tenencia',
            'DID',
            'Distrito de Residencia',
          ],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Vivienda',
          'Tipo de Tenencia': 'Familiar',
          'Tipo de Vivienda': 'Casa',
          'Tipo de barrio': 'Barrio',
          'Distrito de Residencia': 'distrito de residencia',
          Direccion: 'direccion',
          Barrio: 'barrio',
          Localidad: 'localidad',
          'Condiciones grales': 'condiciones generales',
          'Red de gas': 'true',
          Garrafa: 'false',
          'Red de agua': 'false',
          'Pozo/Bomba': 'true',
          'Instalacion de luz': 'Terminada',
          NOMBRE: 'nombre',
          APELLIDO: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:16',
};

const validJWT = jwt.sign(valid, 'livingPlaceKey');

test('Validate ok', async () => {
  const result = await validateCredential(livingPlace.v1, validJWT);
  expect(result.status).toBe(true);
  expect(result.errors).toBe(null);
});

//INVALID SUB

const invalidSub = {
  iat: 1626782449,
  sub: 3,
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Vivienda': {
        category: 'livingPlace',
        preview: {
          type: 2,
          fields: [
            'Tipo de Vivienda',
            'Tipo de Tenencia',
            'DID',
            'Distrito de Residencia',
          ],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Vivienda',
          'Tipo de Tenencia': 'Familiar',
          'Tipo de Vivienda': 'Casa',
          'Tipo de barrio': 'Barrio',
          'Distrito de Residencia': 'distrito de residencia',
          Direccion: 'direccion',
          Barrio: 'barrio',
          Localidad: 'localidad',
          'Condiciones grales': 'condiciones generales',
          'Red de gas': 'true',
          Garrafa: 'false',
          'Red de agua': 'false',
          'Pozo/Bomba': 'true',
          'Instalacion de luz': 'Terminada',
          NOMBRE: 'nombre',
          APELLIDO: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:16',
};

const invalidSubJWT = jwt.sign(invalidSub, 'livingPlaceKey');

test('Validate sub field FAIL', async () => {
  const result = await validateCredential(livingPlace.v1, invalidSubJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.sub');
  expect(result.errors[0].schemaPath).toBe('#/properties/sub/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

//INVALID ISS

const invalidIss = {
  iat: 1626782449,
  sub: 'did:ethr:16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Vivienda': {
        category: 'livingPlace',
        preview: {
          type: 2,
          fields: [
            'Tipo de Vivienda',
            'Tipo de Tenencia',
            'DID',
            'Distrito de Residencia',
          ],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Vivienda',
          'Tipo de Tenencia': 'Familiar',
          'Tipo de Vivienda': 'Casa',
          'Tipo de barrio': 'Barrio',
          'Distrito de Residencia': 'distrito de residencia',
          Direccion: 'direccion',
          Barrio: 'barrio',
          Localidad: 'localidad',
          'Condiciones grales': 'condiciones generales',
          'Red de gas': 'true',
          Garrafa: 'false',
          'Red de agua': 'false',
          'Pozo/Bomba': 'true',
          'Instalacion de luz': 'Terminada',
          NOMBRE: 'nombre',
          APELLIDO: 'apellido',
        },
      },
    },
  },
  iss: 3,
};

const invalidIssJWT = jwt.sign(invalidIss, 'livingPlaceKey');

test('Validate iss field FAIL', async () => {
  const result = await validateCredential(livingPlace.v1, invalidIssJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.iss');
  expect(result.errors[0].schemaPath).toBe('#/properties/iss/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

//INVALID PREVIEW TYPE

const invalidPreviewType = {
  iat: 1626782449,
  sub: 'did:ethr:16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Vivienda': {
        category: 'livingPlace',
        preview: {
          type: '2',
          fields: [
            'Tipo de Vivienda',
            'Tipo de Tenencia',
            'DID',
            'Distrito de Residencia',
          ],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Vivienda',
          'Tipo de Tenencia': 'Familiar',
          'Tipo de Vivienda': 'Casa',
          'Tipo de barrio': 'Barrio',
          'Distrito de Residencia': 'distrito de residencia',
          Direccion: 'direccion',
          Barrio: 'barrio',
          Localidad: 'localidad',
          'Condiciones grales': 'condiciones generales',
          'Red de gas': 'true',
          Garrafa: 'false',
          'Red de agua': 'false',
          'Pozo/Bomba': 'true',
          'Instalacion de luz': 'Terminada',
          NOMBRE: 'nombre',
          APELLIDO: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:16',
};

const invalidPreviewTypeJWT = jwt.sign(invalidPreviewType, 'livingPlaceKey');

test(`Validate .vc.credentialSubject['Semillas Vivienda'].preview.type field FAIL`, async () => {
  const result = await validateCredential(
    livingPlace.v1,
    invalidPreviewTypeJWT,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Semillas Vivienda'].preview.type`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Semillas%20Vivienda/properties/preview/properties/type/type',
  );
  expect(result.errors[0].params.type).toBe('integer');
  expect(result.errors[0].message).toBe('should be integer');
});

// INVALID DATA TYPE

const invalidDataType = {
  iat: 1626782449,
  sub: 'did:ethr:16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Vivienda': {
        category: 'livingPlace',
        preview: {
          type: 2,
          fields: [
            'Tipo de Vivienda',
            'Tipo de Tenencia',
            'DID',
            'Distrito de Residencia',
          ],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 2,
          'Tipo de Tenencia': 'Familiar',
          'Tipo de Vivienda': 'Casa',
          'Tipo de barrio': 'Barrio',
          'Distrito de Residencia': 'distrito de residencia',
          Direccion: 'direccion',
          Barrio: 'barrio',
          Localidad: 'localidad',
          'Condiciones grales': 'condiciones generales',
          'Red de gas': 'true',
          Garrafa: 'false',
          'Red de agua': 'false',
          'Pozo/Bomba': 'true',
          'Instalacion de luz': 'Terminada',
          NOMBRE: 'nombre',
          APELLIDO: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:16',
};
const invalidDataTypeJWT = jwt.sign(invalidDataType, 'livingPlaceKey');

test(`Validate .vc.credentialSubject['Semillas Vivienda'].data.type field FAIL`, async () => {
  const result = await validateCredential(livingPlace.v1, invalidDataTypeJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Semillas Vivienda'].data['CERTIFICADO O CURSO']`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Semillas%20Vivienda/properties/data/properties/CERTIFICADO%20O%20CURSO/type',
  );
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

//INVALID CATEGORY

const invalidCategory = {
  iat: 1626782449,
  sub: 'did:ethr:16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Vivienda': {
        category: 2,
        preview: {
          type: 2,
          fields: [
            'Tipo de Vivienda',
            'Tipo de Tenencia',
            'DID',
            'Distrito de Residencia',
          ],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Vivienda',
          'Tipo de Tenencia': 'Familiar',
          'Tipo de Vivienda': 'Casa',
          'Tipo de barrio': 'Barrio',
          'Distrito de Residencia': 'distrito de residencia',
          Direccion: 'direccion',
          Barrio: 'barrio',
          Localidad: 'localidad',
          'Condiciones grales': 'condiciones generales',
          'Red de gas': 'true',
          Garrafa: 'false',
          'Red de agua': 'false',
          'Pozo/Bomba': 'true',
          'Instalacion de luz': 'Terminada',
          NOMBRE: 'nombre',
          APELLIDO: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:16',
};

const invalidCategoryJWT = jwt.sign(invalidCategory, 'livingPlaceKey');

test(`Validate .vc.credentialSubject.['Semillas Vivienda'].category.type field FAIL`, async () => {
  const result = await validateCredential(livingPlace.v1, invalidCategoryJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Semillas Vivienda'].category`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Semillas%20Vivienda/properties/category/type',
  );
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

const { createSemicolonClassElement } = require('typescript');

const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const { validateCredential } = require('../src/validator');

import { semillaSembTitular } from '../src/schemas/benefit';

const valid = {
  iat: 16,
  sub: 'did:ethr:0*16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Beneficio': {
        category: 'benefit',
        preview: {
          type: 1,
          fields: ['Caracter', 'Dni Beneficiario'],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Beneficio',
          'Dni Beneficiario': 'dni ',
          Caracter: 'FAMILIAR',
          NOMBRE: 'Nombre',
          APELLIDO: 'Apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const validJWT = jwt.sign(valid, 'semillaSembTitularKey');

test('Validate ok', async () => {
  const result = await validateCredential(semillaSembTitular.v1, validJWT);
  expect(result.status).toBe(true);
  expect(result.errors).toBe(null);
});

// INVALID SUB

const invalidSub = {
  iat: 16,
  sub: 3,
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Beneficio': {
        category: 'benefit',
        preview: {
          type: 1,
          fields: ['Caracter', 'Dni Beneficiario'],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Beneficio',
          'Dni Beneficiario': 'dni ',
          Caracter: 'FAMILIAR',
          NOMBRE: 'Nombre',
          APELLIDO: 'Apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const InvalidSubJWT = jwt.sign(invalidSub, 'semillaSembTitularKey');

test('Validate sub field FAIL', async () => {
  const result = await validateCredential(semillaSembTitular.v1, InvalidSubJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.sub');
  expect(result.errors[0].schemaPath).toBe('#/properties/sub/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

// INVALID ISS

const invalidIss = {
  iat: 16,
  sub: 'did:ethr:0*16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Beneficio': {
        category: 'benefit',
        preview: {
          type: 1,
          fields: ['Caracter', 'Dni Beneficiario'],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Beneficio',
          'Dni Beneficiario': 'dni ',
          Caracter: 'FAMILIAR',
          NOMBRE: 'Nombre',
          APELLIDO: 'Apellido',
        },
      },
    },
  },
  iss: 3,
};

const InvalidIssJWT = jwt.sign(invalidIss, 'semillaSembTitularKey');

test('Validate iss field FAIL', async () => {
  const result = await validateCredential(semillaSembTitular.v1, InvalidIssJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.iss');
  expect(result.errors[0].schemaPath).toBe('#/properties/iss/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

// INVALID PREVIEW TYPE
const invalidPreviewType = {
  iat: 16,
  sub: 'did:ethr:0*16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Beneficio': {
        category: 'benefit',
        preview: {
          type: '1',
          fields: ['Caracter', 'Dni Beneficiario'],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Beneficio',
          'Dni Beneficiario': 'dni ',
          Caracter: 'FAMILIAR',
          NOMBRE: 'Nombre',
          APELLIDO: 'Apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const invalidPreviewJWT = jwt.sign(invalidPreviewType, 'semillaSembTitularKey');

test(`Validate .vc.credentialSubject['Semillas Beneficio'].preview.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaSembTitular.v1,
    invalidPreviewJWT,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Semillas Beneficio'].preview.type`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Semillas%20Beneficio/properties/preview/properties/type/type',
  );
  expect(result.errors[0].params.type).toBe('integer');
  expect(result.errors[0].message).toBe('should be integer');
});

// INVALID DATA TYPE

const invalidDataType = {
  iat: 16,
  sub: 'did:ethr:0*16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Beneficio': {
        category: 'benefit',
        preview: {
          type: 1,
          fields: ['Caracter', 'Dni Beneficiario'],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 3,
          'Dni Beneficiario': 'dni ',
          Caracter: 'FAMILIAR',
          NOMBRE: 'Nombre',
          APELLIDO: 'Apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};
const invalidDataTypeJWT = jwt.sign(invalidDataType, 'semillaSembTitularKey');

test(`Validate .vc.credentialSubject['Semillas Beneficio'].data.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaSembTitular.v1,
    invalidDataTypeJWT,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Semillas Beneficio'].data['CERTIFICADO O CURSO']`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Semillas%20Beneficio/properties/data/properties/CERTIFICADO%20O%20CURSO/type',
  );
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

// INVALID CATEGORY TYPE
const invalidCategory = {
  iat: 16,
  sub: 'did:ethr:0*16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Beneficio': {
        category: 3,
        preview: {
          type: 1,
          fields: ['Caracter', 'Dni Beneficiario'],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Beneficio',
          'Dni Beneficiario': 'dni ',
          Caracter: 'FAMILIAR',
          NOMBRE: 'Nombre',
          APELLIDO: 'Apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const invalidCategoryJWT = jwt.sign(invalidCategory, 'semillaSembTitularKey');

test(`Validate .vc.credentialSubject['Semillas Beneficio'].category.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaSembTitular.v1,
    invalidCategoryJWT,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Semillas Beneficio'].category`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Semillas%20Beneficio/properties/category/type',
  );
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

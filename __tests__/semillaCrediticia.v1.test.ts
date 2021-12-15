import { semillaCrediticia } from '../src/schemas/finance';

const { createSemicolonClassElement } = require('typescript');

const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const { validateCredential } = require('../src/validator');

const valid = {
  iat: 123456,
  sub: 'did:ethr:0x16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Crediticia': {
        category: 'finance',
        preview: {
          type: 2,
          fields: [
            'Tipo de Credito',
            'Estado de Credito',
            'Saldo Vencido',
            'Cuotas Totales',
          ],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Crediticia',
          'Dni Titular': 'dni',
          'Id Credito': 'id del credito',
          'Tipo de Credito': 'Tipo de credito ',
          'Id Grupo': 'Id grupo',
          'Ciclo del Credito': 'Tipo de credito Ciclo 2',
          'Estado de Credito': 'Al dia',
          'Monto total del Credito [$]': '55000.00',
          'Saldo Vencido': '0.00',
          'Cuota Actual': '0',
          'Cuotas Totales': '4',
          'Fecha de vencimiento de Cuota': 'fecha',
          'Fecha de inicio': 'fecha',
          NOMBRE: 'nombre',
          APELLIDO: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const validJWT = jwt.sign(valid, 'semillaCrediticiaKey');

test('validate ok', async () => {
  const result = await validateCredential(semillaCrediticia.v1, validJWT);
  expect(result.status).toBe(true);
  expect(result.errors).toBeNull();
});

// INVALID SUB
const invalidSub = {
  iat: 123456,
  sub: 26,
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Crediticia': {
        category: 'finance',
        preview: {
          type: 2,
          fields: [
            'Tipo de Credito',
            'Estado de Credito',
            'Saldo Vencido',
            'Cuotas Totales',
          ],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Crediticia',
          'Dni Titular': 'dni',
          'Id Credito': 'id del credito',
          'Tipo de Credito': 'Tipo de credito ',
          'Id Grupo': 'Id grupo',
          'Ciclo del Credito': 'Tipo de credito Ciclo 2',
          'Estado de Credito': 'Al dia',
          'Monto total del Credito [$]': '55000.00',
          'Saldo Vencido': '0.00',
          'Cuota Actual': '0',
          'Cuotas Totales': '4',
          'Fecha de vencimiento de Cuota': 'fecha',
          'Fecha de inicio': 'fecha',
          NOMBRE: 'nombre',
          APELLIDO: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const invalidSubJWT = jwt.sign(invalidSub, 'semillaCrediticiaKey');

test('validate sub field FAIL', async () => {
  const result = await validateCredential(semillaCrediticia.v1, invalidSubJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.sub');
  expect(result.errors[0].schemaPath).toBe('#/properties/sub/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

// INVALID ISS
const invalidIss = {
  iat: 123456,
  sub: 'did:ethr:0x16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Crediticia': {
        category: 'finance',
        preview: {
          type: 2,
          fields: [
            'Tipo de Credito',
            'Estado de Credito',
            'Saldo Vencido',
            'Cuotas Totales',
          ],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Crediticia',
          'Dni Titular': 'dni',
          'Id Credito': 'id del credito',
          'Tipo de Credito': 'Tipo de credito ',
          'Id Grupo': 'Id grupo',
          'Ciclo del Credito': 'Tipo de credito Ciclo 2',
          'Estado de Credito': 'Al dia',
          'Monto total del Credito [$]': '55000.00',
          'Saldo Vencido': '0.00',
          'Cuota Actual': '0',
          'Cuotas Totales': '4',
          'Fecha de vencimiento de Cuota': 'fecha',
          'Fecha de inicio': 'fecha',
          NOMBRE: 'nombre',
          APELLIDO: 'apellido',
        },
      },
    },
  },
  iss: 44,
};

const invalidIssJWT = jwt.sign(invalidIss, 'semillaCrediticiaKey');

test('validate iss field FAIL', async () => {
  const result = await validateCredential(semillaCrediticia.v1, invalidIssJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.iss');
  expect(result.errors[0].schemaPath).toBe('#/properties/iss/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

// INVALID PREVIEW TYPE
const invalidPreviewType = {
  iat: 123456,
  sub: 'did:ethr:0x16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Crediticia': {
        category: 'finance',
        preview: {
          type: '2',
          fields: [
            'Tipo de Credito',
            'Estado de Credito',
            'Saldo Vencido',
            'Cuotas Totales',
          ],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Crediticia',
          'Dni Titular': 'dni',
          'Id Credito': 'id del credito',
          'Tipo de Credito': 'Tipo de credito ',
          'Id Grupo': 'Id grupo',
          'Ciclo del Credito': 'Tipo de credito Ciclo 2',
          'Estado de Credito': 'Al dia',
          'Monto total del Credito [$]': '55000.00',
          'Saldo Vencido': '0.00',
          'Cuota Actual': '0',
          'Cuotas Totales': '4',
          'Fecha de vencimiento de Cuota': 'fecha',
          'Fecha de inicio': 'fecha',
          NOMBRE: 'nombre',
          APELLIDO: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const invalidPreviewTypeJWT = jwt.sign(
  invalidPreviewType,
  'semillaCrediticiaKey',
);

test(`validate .vc.credentialSubject['Semillas Crediticia'].preview.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaCrediticia.v1,
    invalidPreviewTypeJWT,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Semillas Crediticia'].preview.type`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Semillas%20Crediticia/properties/preview/properties/type/type',
  );
  expect(result.errors[0].params.type).toBe('integer');
  expect(result.errors[0].message).toBe('should be integer');
});

// INVALID DATA TYPE
const invalidDataType = {
  iat: 123456,
  sub: 'did:ethr:0x16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Crediticia': {
        category: 'finance',
        preview: {
          type: 2,
          fields: [
            'Tipo de Credito',
            'Estado de Credito',
            'Saldo Vencido',
            'Cuotas Totales',
          ],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 23,
          'Dni Titular': 'dni',
          'Id Credito': 'id del credito',
          'Tipo de Credito': 'Tipo de credito ',
          'Id Grupo': 'Id grupo',
          'Ciclo del Credito': 'Tipo de credito Ciclo 2',
          'Estado de Credito': 'Al dia',
          'Monto total del Credito [$]': '55000.00',
          'Saldo Vencido': '0.00',
          'Cuota Actual': '0',
          'Cuotas Totales': '4',
          'Fecha de vencimiento de Cuota': 'fecha',
          'Fecha de inicio': 'fecha',
          NOMBRE: 'nombre',
          APELLIDO: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const invalidDataTypeJWT = jwt.sign(invalidDataType, 'semillaCrediticiaKey');

test(`validate .vc.credentialSubject['Semillas Crediticia'].data.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaCrediticia.v1,
    invalidDataTypeJWT,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Semillas Crediticia'].data['CERTIFICADO O CURSO']`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Semillas%20Crediticia/properties/data/properties/CERTIFICADO%20O%20CURSO/type',
  );
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

// INVALID CATEGORY
const invalidCategory = {
  iat: 123456,
  sub: 'did:ethr:0x16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Semillas Crediticia': {
        category: 23,
        preview: {
          type: 2,
          fields: [
            'Tipo de Credito',
            'Estado de Credito',
            'Saldo Vencido',
            'Cuotas Totales',
          ],
          cardLayout: null,
        },
        data: {
          'CERTIFICADO O CURSO': 'Semillas Crediticia',
          'Dni Titular': 'dni',
          'Id Credito': 'id del credito',
          'Tipo de Credito': 'Tipo de credito ',
          'Id Grupo': 'Id grupo',
          'Ciclo del Credito': 'Tipo de credito Ciclo 2',
          'Estado de Credito': 'Al dia',
          'Monto total del Credito [$]': '55000.00',
          'Saldo Vencido': '0.00',
          'Cuota Actual': '0',
          'Cuotas Totales': '4',
          'Fecha de vencimiento de Cuota': 'fecha',
          'Fecha de inicio': 'fecha',
          NOMBRE: 'nombre',
          APELLIDO: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const invalidCategoryJWT = jwt.sign(invalidCategory, 'semillaCrediticiaKey');

test(`validate .vc.credentialSubject['Semillas Crediticia'].category.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaCrediticia.v1,
    invalidCategoryJWT,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Semillas Crediticia'].category`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Semillas%20Crediticia/properties/category/type',
  );
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

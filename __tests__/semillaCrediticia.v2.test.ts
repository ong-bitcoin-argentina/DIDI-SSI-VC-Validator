import { semillaCrediticia } from '../src/schemas/finance';

const jwt = require('jsonwebtoken');
const { validateCredential } = require('../src/validator');

const valid = {
  iat: 16,
  sub: 'did:ethr:0x16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v2'],
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
          credentialName: 'Semillas Crediticia',
          dni: 'numero de dni',
          creditId: 'credit  Id',
          creditType: 'tipo de credito ',
          creditGroupID: 'grupo credito',
          creditCycle: 'tipo de credito Ciclo 2',
          creditStatus: 'Al dia',
          creditTotalAmount: '55000.00',
          creditBalanceDue: '0.00',
          creditCurrentInstallment: '0',
          creditTotalInstallments: 'cantidad',
          creditDatePaymentDue: 'fecha',
          creditStartDate: 'fecha de inicio',
          givenName: 'nombre',
          familyName: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const validJWT = jwt.sign(valid, 'semillaCrediticiaKey');

describe('semillacrediticia.v2.test', () => {
  it('validate ok', async () => {
    expect.assertions(2);
    const result = await validateCredential(semillaCrediticia.v2, validJWT);
    expect(result.status).toBe(true);
    expect(result.errors).toBeNull();
  });

  // INVALID SUB
  const invalidSub = {
    iat: 16,
    sub: 26,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v2'],
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
            credentialName: 'Semillas Crediticia',
            dni: 'numero de dni',
            creditId: 'credit  Id',
            creditType: 'tipo de credito ',
            creditGroupID: 'grupo credito',
            creditCycle: 'tipo de credito Ciclo 2',
            creditStatus: 'Al dia',
            creditTotalAmount: '55000.00',
            creditBalanceDue: '0.00',
            creditCurrentInstallment: '0',
            creditTotalInstallments: 'cantidad',
            creditDatePaymentDue: 'fecha',
            creditStartDate: 'fecha de inicio',
            givenName: 'nombre',
            familyName: 'apellido',
          },
        },
      },
    },
    iss: 'did:ethr:0x16',
  };

  const invalidSubJWT = jwt.sign(invalidSub, 'semillaCrediticiaKey');

  it('validate sub field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaCrediticia.v2,
      invalidSubJWT,
    );
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
    sub: 'did:ethr:0x16',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v2'],
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
            credentialName: 'Semillas Crediticia',
            dni: 'numero de dni',
            creditId: 'credit  Id',
            creditType: 'tipo de credito ',
            creditGroupID: 'grupo credito',
            creditCycle: 'tipo de credito Ciclo 2',
            creditStatus: 'Al dia',
            creditTotalAmount: '55000.00',
            creditBalanceDue: '0.00',
            creditCurrentInstallment: '0',
            creditTotalInstallments: 'cantidad',
            creditDatePaymentDue: 'fecha',
            creditStartDate: 'fecha de inicio',
            givenName: 'nombre',
            familyName: 'apellido',
          },
        },
      },
    },
    iss: 16,
  };

  const invalidIssJWT = jwt.sign(invalidIss, 'semillaCrediticiaKey');

  it('validate iss field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaCrediticia.v2,
      invalidIssJWT,
    );
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
    sub: 'did:ethr:0x16',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v2'],
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
            credentialName: 'Semillas Crediticia',
            dni: 'numero de dni',
            creditId: 'credit  Id',
            creditType: 'tipo de credito ',
            creditGroupID: 'grupo credito',
            creditCycle: 'tipo de credito Ciclo 2',
            creditStatus: 'Al dia',
            creditTotalAmount: '55000.00',
            creditBalanceDue: '0.00',
            creditCurrentInstallment: '0',
            creditTotalInstallments: 'cantidad',
            creditDatePaymentDue: 'fecha',
            creditStartDate: 'fecha de inicio',
            givenName: 'nombre',
            familyName: 'apellido',
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

  it(`validate .vc.credentialSubject['Semillas Crediticia'].preview.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaCrediticia.v2,
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
    iat: 16,
    sub: 'did:ethr:0x16',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v2'],
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
            credentialName: 23,
            dni: 'numero de dni',
            creditId: 'credit  Id',
            creditType: 'tipo de credito ',
            creditGroupID: 'grupo credito',
            creditCycle: 'tipo de credito Ciclo 2',
            creditStatus: 'Al dia',
            creditTotalAmount: '55000.00',
            creditBalanceDue: '0.00',
            creditCurrentInstallment: '0',
            creditTotalInstallments: 'cantidad',
            creditDatePaymentDue: 'fecha',
            creditStartDate: 'fecha de inicio',
            givenName: 'nombre',
            familyName: 'apellido',
          },
        },
      },
    },
    iss: 'did:ethr:0x16',
  };

  const invalidDataTypeJWT = jwt.sign(invalidDataType, 'semillaCrediticiaKey');

  it(`validate .vc.credentialSubject['Semillas Crediticia'].data.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaCrediticia.v2,
      invalidDataTypeJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Semillas Crediticia'].data.credentialName`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Semillas%20Crediticia/properties/data/properties/credentialName/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID CATEGORY
  const invalidCategory = {
    iat: 16,
    sub: 'did:ethr:0x16',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v2'],
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
            credentialName: 'Semillas Crediticia',
            dni: 'numero de dni',
            creditId: 'credit  Id',
            creditType: 'tipo de credito ',
            creditGroupID: 'grupo credito',
            creditCycle: 'tipo de credito Ciclo 2',
            creditStatus: 'Al dia',
            creditTotalAmount: '55000.00',
            creditBalanceDue: '0.00',
            creditCurrentInstallment: '0',
            creditTotalInstallments: 'cantidad',
            creditDatePaymentDue: 'fecha',
            creditStartDate: 'fecha de inicio',
            givenName: 'nombre',
            familyName: 'apellido',
          },
        },
      },
    },
    iss: 'did:ethr:0x16',
  };

  const invalidCategoryJWT = jwt.sign(invalidCategory, 'semillaCrediticiaKey');

  it(`validate .vc.credentialSubject['Semillas Crediticia'].category.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaCrediticia.v2,
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
});

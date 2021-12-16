import { semillaSembTitular } from '../src/schemas/benefit';

const jwt = require('jsonwebtoken');
const { validateCredential } = require('../src/validator');

const valid = {
  iat: 16,
  sub: 'did:ethr:0x16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v2'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Sembrando - Titular': {
        category: 'benefit',
        preview: {
          type: 1,
          fields: ['benefitHolderType', 'dni'],
          cardLayout: null,
        },
        data: {
          credentialName: 'Sembrando - Titular',
          dni: 'dni',
          benefitHolderType: 'FAMILIAR',
          givenName: 'nombre',
          familyName: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const validJWT = jwt.sign(valid, 'semillaSembTitularKey');

describe('semillaSembTitular.v2.test', () => {
  it('validate ok', async () => {
    expect.assertions(2);
    const result = await validateCredential(semillaSembTitular.v2, validJWT);
    expect(result.status).toBe(true);
    expect(result.errors).toBeNull();
  });

  // INVALID SUB

  const invalidSub = {
    iat: 16,
    sub: 3,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v2'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        'Sembrando - Titular': {
          category: 'benefit',
          preview: {
            type: 1,
            fields: ['benefitHolderType', 'dni'],
            cardLayout: null,
          },
          data: {
            credentialName: 'Sembrando - Titular',
            dni: 'dni',
            benefitHolderType: 'FAMILIAR',
            givenName: 'nombre',
            familyName: 'apellido',
          },
        },
      },
    },
    iss: 'did:ethr:0x16',
  };

  const InvalidSubJWT = jwt.sign(invalidSub, 'semillaSembTitularKey');

  it('validate sub field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaSembTitular.v2,
      InvalidSubJWT,
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
        'Sembrando - Titular': {
          category: 'benefit',
          preview: {
            type: 1,
            fields: ['benefitHolderType', 'dni'],
            cardLayout: null,
          },
          data: {
            credentialName: 'Sembrando - Titular',
            dni: 'dni',
            benefitHolderType: 'FAMILIAR',
            givenName: 'nombre',
            familyName: 'apellido',
          },
        },
      },
    },
    iss: 3,
  };

  const InvalidIssJWT = jwt.sign(invalidIss, 'semillaSembTitularKey');

  it('validate iss field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaSembTitular.v2,
      InvalidIssJWT,
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
        'Sembrando - Titular': {
          category: 'benefit',
          preview: {
            type: '1',
            fields: ['benefitHolderType', 'dni'],
            cardLayout: null,
          },
          data: {
            credentialName: 'Sembrando - Titular',
            dni: 'dni',
            benefitHolderType: 'FAMILIAR',
            givenName: 'nombre',
            familyName: 'apellido',
          },
        },
      },
    },
    iss: 'did:ethr:0x16',
  };

  const invalidPreviewJWT = jwt.sign(
    invalidPreviewType,
    'semillaSembTitularKey',
  );

  it(`validate .vc.credentialSubject['Sembrando - Titular'].preview.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaSembTitular.v2,
      invalidPreviewJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Sembrando - Titular'].preview.type`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Sembrando%20-%20Titular/properties/preview/properties/type/type',
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
        'Sembrando - Titular': {
          category: 'benefit',
          preview: {
            type: 1,
            fields: ['benefitHolderType', 'dni'],
            cardLayout: null,
          },
          data: {
            credentialName: 3,
            dni: 'dni',
            benefitHolderType: 'FAMILIAR',
            givenName: 'nombre',
            familyName: 'apellido',
          },
        },
      },
    },
    iss: 'did:ethr:0x16',
  };
  const invalidDataTypeJWT = jwt.sign(invalidDataType, 'semillaSembTitularKey');

  it(`validate .vc.credentialSubject['Sembrando - Titular'].data.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaSembTitular.v2,
      invalidDataTypeJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Sembrando - Titular'].data.credentialName`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Sembrando%20-%20Titular/properties/data/properties/credentialName/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID CATEGORY TYPE
  const invalidCategory = {
    iat: 16,
    sub: 'did:ethr:0x16',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v2'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        'Sembrando - Titular': {
          category: 3,
          preview: {
            type: 1,
            fields: ['benefitHolderType', 'dni'],
            cardLayout: null,
          },
          data: {
            credentialName: 'Sembrando - Titular',
            dni: 'dni',
            benefitHolderType: 'FAMILIAR',
            givenName: 'nombre',
            familyName: 'apellido',
          },
        },
      },
    },
    iss: 'did:ethr:0x16',
  };

  const invalidCategoryJWT = jwt.sign(invalidCategory, 'semillaSembTitularKey');

  it(`validate .vc.credentialSubject['Sembrando - Titular'].category.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaSembTitular.v2,
      invalidCategoryJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Sembrando - Titular'].category`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Sembrando%20-%20Titular/properties/category/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });
});

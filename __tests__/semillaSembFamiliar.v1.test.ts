import { semillaSembFamiliar } from '../src/schemas/benefit';

const jwt = require('jsonwebtoken');
const { validateCredential } = require('../src/validator');

const valid = {
  iat: 123456,
  sub: '1232123',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Sembrando - Familiar': {
        data: {
          credentialName: 'Test credential Name',
          beneficiaryDNI: 'Test beneficiary DNI',
          benefitHolderType: 'Test benefit Holder Type',
          givenName: 'Test given name',
          familyName: 'Test family name',
        },
        category: 'benefit',
        preview: {
          type: 1,
          fields: [
            'credentialNumber',
            'beneficiaryDNI',
            'benefitHolderType',
            'givenName',
            'familyName',
          ],
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const validJWT = jwt.sign(valid, 'semillaSembFamiliarKey');

describe('semillaSembFamiliar.v1.test', () => {
  it('validate ok', async () => {
    expect.assertions(2);
    const result = await validateCredential(semillaSembFamiliar.v1, validJWT);
    expect(result.status).toBe(true);
    expect(result.errors).toBeNull();
  });

  // INVALID SUB

  const invalidSub = {
    iat: 123456,
    sub: 1232123,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],

      credentialSubject: {
        'Sembrando - Familiar': {
          data: {
            credentialName: 'Test credential Name',
            beneficiaryDNI: 'Test beneficiary DNI',
            benefitHolderType: 'Test benefit Holder Type',
            givenName: 'Test given name',
            familyName: 'Test family name',
          },
          category: 'benefit',
          preview: {
            type: 1,
            fields: [
              'credentialNumber',
              'beneficiaryDNI',
              'benefitHolderType',
              'givenName',
              'familyName',
            ],
          },
        },
      },
    },
    iss: 'did:ethr:0x16',
  };

  const InvalidSubJWT = jwt.sign(invalidSub, 'semillaSembFamiliarKey');

  it('validate sub field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaSembFamiliar.v1,
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
    iat: 123456,
    sub: '1232123',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],

      credentialSubject: {
        'Sembrando - Familiar': {
          data: {
            credentialName: 'Test credential Name',
            beneficiaryDNI: 'Test beneficiary DNI',
            benefitHolderType: 'Test benefit Holder Type',
            givenName: 'Test given name',
            familyName: 'Test family name',
          },
          category: 'benefit',
          preview: {
            type: 1,
            fields: [
              'credentialNumber',
              'beneficiaryDNI',
              'benefitHolderType',
              'givenName',
              'familyName',
            ],
          },
        },
      },
    },
    iss: 7878,
  };

  const InvalidIssJWT = jwt.sign(invalidIss, 'semillaSembFamiliarKey');

  it('validate iss field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaSembFamiliar.v1,
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
    iat: 123456,
    sub: '1232123',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        'Sembrando - Familiar': {
          data: {
            credentialName: 'Test credential Name',
            beneficiaryDNI: 'Test beneficiary DNI',
            benefitHolderType: 'Test benefit Holder Type',
            givenName: 'Test given name',
            familyName: 'Test family name',
          },
          category: 'benefit',
          preview: {
            type: '1',
            fields: [
              'credentialNumber',
              'beneficiaryDNI',
              'benefitHolderType',
              'givenName',
              'familyName',
            ],
          },
        },
      },
    },
    iss: 'did:ethr:0x16',
  };

  const invalidPreviewJWT = jwt.sign(
    invalidPreviewType,
    'semillaSembFamiliarKey',
  );

  it(`validate .vc.credentialSubject['Sembrando - Familiar'].preview.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaSembFamiliar.v1,
      invalidPreviewJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Sembrando - Familiar'].preview.type`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Sembrando%20-%20Familiar/properties/preview/properties/type/type',
    );
    expect(result.errors[0].params.type).toBe('integer');
    expect(result.errors[0].message).toBe('should be integer');
  });

  // INVALID DATA TYPE

  const invalidDataType = {
    iat: 123456,
    sub: '1232123',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        'Sembrando - Familiar': {
          data: {
            credentialName: 123456,
            beneficiaryDNI: 'Test beneficiary DNI',
            benefitHolderType: 'Test benefit Holder Type',
            givenName: 'Test given name',
            familyName: 'Test family name',
          },
          category: 'benefit',
          preview: {
            type: 1,
            fields: [
              'credentialNumber',
              'beneficiaryDNI',
              'benefitHolderType',
              'givenName',
              'familyName',
            ],
          },
        },
      },
    },
    iss: 'did:ethr:0x16',
  };

  const invalidDataTypeJWT = jwt.sign(
    invalidDataType,
    'semillaSembFamiliarKey',
  );

  it(`validate .vc.credentialSubject['Sembrando - Familiar'].data.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaSembFamiliar.v1,
      invalidDataTypeJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Sembrando - Familiar'].data.credentialName`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Sembrando%20-%20Familiar/properties/data/properties/credentialName/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID CATEGORY TYPE
  const invalidCategory = {
    iat: 123456,
    sub: '1232123',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        'Sembrando - Familiar': {
          data: {
            credentialName: 'Test credential Name',
            beneficiaryDNI: 'Test beneficiary DNI',
            benefitHolderType: 'Test benefit Holder Type',
            givenName: 'Test given name',
            familyName: 'Test family name',
          },
          category: 1,
          preview: {
            type: 1,
            fields: [
              'credentialNumber',
              'beneficiaryDNI',
              'benefitHolderType',
              'givenName',
              'familyName',
            ],
          },
        },
      },
    },
    iss: 'did:ethr:0x16',
  };

  const invalidCategoryJWT = jwt.sign(
    invalidCategory,
    'semillaSembFamiliarKey',
  );

  it(`validate .vc.credentialSubject['Sembrando - Familiar'].category.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaSembFamiliar.v1,
      invalidCategoryJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Sembrando - Familiar'].category`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Sembrando%20-%20Familiar/properties/category/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });
});

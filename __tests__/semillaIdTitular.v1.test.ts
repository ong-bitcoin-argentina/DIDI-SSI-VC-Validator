import { semillaIdTitular } from '../src/schemas/finance';

const jwt = require('jsonwebtoken');
const { validateCredential } = require('../src/validator');

const valid = {
  iat: 16,
  sub: '16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Identidad Titular': {
        data: {
          credentialName: 'CertificadoTest',
          dni: 'numero de Dni',
          givenName: 'nombre',
          familyName: 'apellido beneficiario',
          holderRelation: 'parentezco',
          beneficiaryDni: 'dni beneficiario',
          beneficiaryGivenName: 'nombre beneficiario',
          beneficiaryFamilyName: 'apellido beneficiario',
          gender: 'sexo',
          birthDate: 'fecha de nacimiento',
        },
        category: 'finance',
        preview: {
          type: 1,
          fields: [
            'credentialName',
            'dni',
            'givenName',
            'familyName',
            'holderRelation',
            'beneficiaryDni',
            'beneficiaryGivenName',
            'beneficiaryFamilyName',
            'gender',
            'birthDate',
          ],
        },
      },
    },
  },
  iss: 'did:ethr:0x2b184203babefe306901a76b053bc38659e4a795',
};

const validJWT = jwt.sign(valid, 'semillaIdTitularKey');

describe('semillaIdTitular.v1.test', () => {
  it('validate ok', async () => {
    expect.assertions(2);
    const result = await validateCredential(semillaIdTitular.v1, validJWT);
    expect(result.status).toBe(true);
    expect(result.errors).toBeNull();
  });

  // INVALID SUB
  const invalidSub = {
    iat: 16,
    sub: 16,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        'Identidad Titular': {
          data: {
            credentialName: 'CertificadoTest',
            dni: 'numero de Dni',
            givenName: 'nombre',
            familyName: 'apellido beneficiario',
            holderRelation: 'parentezco',
            beneficiaryDni: 'dni beneficiario',
            beneficiaryGivenName: 'nombre beneficiario',
            beneficiaryFamilyName: 'apellido beneficiario',
            gender: 'sexo',
            birthDate: 'fecha de nacimiento',
          },
          category: 'finance',
          preview: {
            type: 1,
            fields: [
              'credentialName',
              'dni',
              'givenName',
              'familyName',
              'holderRelation',
              'beneficiaryDni',
              'beneficiaryGivenName',
              'beneficiaryFamilyName',
              'gender',
              'birthDate',
            ],
          },
        },
      },
    },
    iss: 'did:ethr:0x2b184203babefe306901a76b053bc38659e4a795',
  };

  const invalidSubJWT = jwt.sign(invalidSub, 'semillaIdTitularKey');

  it('validate sub field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(semillaIdTitular.v1, invalidSubJWT);
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
    sub: '16',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        'Identidad Titular': {
          data: {
            credentialName: 'CertificadoTest',
            dni: 'numero de Dni',
            givenName: 'nombre',
            familyName: 'apellido beneficiario',
            holderRelation: 'parentezco',
            beneficiaryDni: 'dni beneficiario',
            beneficiaryGivenName: 'nombre beneficiario',
            beneficiaryFamilyName: 'apellido beneficiario',
            gender: 'sexo',
            birthDate: 'fecha de nacimiento',
          },
          category: 'finance',
          preview: {
            type: 1,
            fields: [
              'credentialName',
              'dni',
              'givenName',
              'familyName',
              'holderRelation',
              'beneficiaryDni',
              'beneficiaryGivenName',
              'beneficiaryFamilyName',
              'gender',
              'birthDate',
            ],
          },
        },
      },
    },
    iss: 3333,
  };

  const invalidIssJWT = jwt.sign(invalidIss, 'semillaIdTitularKey');

  it('validate iss field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(semillaIdTitular.v1, invalidIssJWT);
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
    sub: '16',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        'Identidad Titular': {
          data: {
            credentialName: 'CertificadoTest',
            dni: 'numero de Dni',
            givenName: 'nombre',
            familyName: 'apellido beneficiario',
            holderRelation: 'parentezco',
            beneficiaryDni: 'dni beneficiario',
            beneficiaryGivenName: 'nombre beneficiario',
            beneficiaryFamilyName: 'apellido beneficiario',
            gender: 'sexo',
            birthDate: 'fecha de nacimiento',
          },
          category: 'finance',
          preview: {
            type: '1',
            fields: [
              'credentialName',
              'dni',
              'givenName',
              'familyName',
              'holderRelation',
              'beneficiaryDni',
              'beneficiaryGivenName',
              'beneficiaryFamilyName',
              'gender',
              'birthDate',
            ],
          },
        },
      },
    },
    iss: 'did:ethr:0x2b184203babefe306901a76b053bc38659e4a795',
  };

  const invalidPreviewTypeJWT = jwt.sign(
    invalidPreviewType,
    'semillaIdTitularKey',
  );

  it(`validate .vc.credentialSubject['Identidad Titular'].preview.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaIdTitular.v1,
      invalidPreviewTypeJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Identidad Titular'].preview.type`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Identidad%20Titular/properties/preview/properties/type/type',
    );
    expect(result.errors[0].params.type).toBe('integer');
    expect(result.errors[0].message).toBe('should be integer');
  });

  // INVALID DATA TYPE
  const invalidDataType = {
    iat: 16,
    sub: '16',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        'Identidad Titular': {
          data: {
            credentialName: 123,
            dni: 'numero de Dni',
            givenName: 'nombre',
            familyName: 'apellido beneficiario',
            holderRelation: 'parentezco',
            beneficiaryDni: 'dni beneficiario',
            beneficiaryGivenName: 'nombre beneficiario',
            beneficiaryFamilyName: 'apellido beneficiario',
            gender: 'sexo',
            birthDate: 'fecha de nacimiento',
          },
          category: 'finance',
          preview: {
            type: 1,
            fields: [
              'credentialName',
              'dni',
              'givenName',
              'familyName',
              'holderRelation',
              'beneficiaryDni',
              'beneficiaryGivenName',
              'beneficiaryFamilyName',
              'gender',
              'birthDate',
            ],
          },
        },
      },
    },
    iss: 'did:ethr:0x2b184203babefe306901a76b053bc38659e4a795',
  };

  const invalidDataTypeJWT = jwt.sign(invalidDataType, 'semillaIdTitularKey');

  it(`validate .vc.credentialSubject['Identidad Titular'].data.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaIdTitular.v1,
      invalidDataTypeJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Identidad Titular'].data.credentialName`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Identidad%20Titular/properties/data/properties/credentialName/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID CATEGORY

  const invalidCategory = {
    iat: 16,
    sub: '16',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        'Identidad Titular': {
          data: {
            credentialName: 'CertificadoTest',
            dni: 'numero de Dni',
            givenName: 'nombre',
            familyName: 'apellido beneficiario',
            holderRelation: 'parentezco',
            beneficiaryDni: 'dni beneficiario',
            beneficiaryGivenName: 'nombre beneficiario',
            beneficiaryFamilyName: 'apellido beneficiario',
            gender: 'sexo',
            birthDate: 'fecha de nacimiento',
          },
          category: 3,
          preview: {
            type: 1,
            fields: [
              'credentialName',
              'dni',
              'givenName',
              'familyName',
              'holderRelation',
              'beneficiaryDni',
              'beneficiaryGivenName',
              'beneficiaryFamilyName',
              'gender',
              'birthDate',
            ],
          },
        },
      },
    },
    iss: 'did:ethr:0x2b184203babefe306901a76b053bc38659e4a795',
  };

  const invalidCategoryJWT = jwt.sign(invalidCategory, 'semillaIdTitularKey');

  it(`validate .vc.credentialSubject['Identidad Titular'].category.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaIdTitular.v1,
      invalidCategoryJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Identidad Titular'].category`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Identidad%20Titular/properties/category/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });
});

import { semillaIdFamiliar } from '../src/schemas/finance';

const jwt = require('jsonwebtoken');
const { validateCredential } = require('../src/validator');

const valid = {
  iat: 123456,
  sub: '1232123',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Identidad Familiar': {
        data: {
          credentialName: 'CertificadoTest',
          dni: 'dni',
          givenName: 'nombre',
          familyName: 'apellido',
          holderRelation: 'parentezco',
          beneficiaryDni: 'dni',
          beneficiaryGivenName: 'nombre',
          beneficiaryFamilyName: 'apellido',
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

const validJWT = jwt.sign(valid, 'semillaIdFamiliarKey');

describe('semillaIdFamiliar.v1.test', () => {
  it('validate ok', async () => {
    expect.assertions(2);
    const result = await validateCredential(semillaIdFamiliar.v1, validJWT);
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
        'Identidad Familiar': {
          data: {
            credentialName: 'CertificadoTest',
            dni: 'dni',
            givenName: 'nombre',
            familyName: 'apellido',
            holderRelation: 'parentezco',
            beneficiaryDni: 'dni',
            beneficiaryGivenName: 'nombre',
            beneficiaryFamilyName: 'apellido',
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

  const invalidSubJWT = jwt.sign(invalidSub, 'semillaIdFamiliarKey');

  it('validate sub field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaIdFamiliar.v1,
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
    iat: 123456,
    sub: '1232123',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        'Identidad Familiar': {
          data: {
            credentialName: 'CertificadoTest',
            dni: 'dni',
            givenName: 'nombre',
            familyName: 'apellido',
            holderRelation: 'parentezco',
            beneficiaryDni: 'dni',
            beneficiaryGivenName: 'nombre',
            beneficiaryFamilyName: 'apellido',
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

  const invalidIssJWT = jwt.sign(invalidIss, 'semillaIdFamiliarKey');

  it('validate iss field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaIdFamiliar.v1,
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
    iat: 123456,
    sub: '1232123',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        'Identidad Familiar': {
          data: {
            credentialName: 'CertificadoTest',
            dni: 'dni',
            givenName: 'nombre',
            familyName: 'apellido',
            holderRelation: 'parentezco',
            beneficiaryDni: 'dni',
            beneficiaryGivenName: 'nombre',
            beneficiaryFamilyName: 'apellido',
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
    'semillaIdFamiliarKey',
  );

  it(`validate .vc.credentialSubject['Identidad Familiar'].preview.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaIdFamiliar.v1,
      invalidPreviewTypeJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Identidad Familiar'].preview.type`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Identidad%20Familiar/properties/preview/properties/type/type',
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
        'Identidad Familiar': {
          data: {
            credentialName: 123,
            dni: 'dni',
            givenName: 'nombre',
            familyName: 'apellido',
            holderRelation: 'parentezco',
            beneficiaryDni: 'dni',
            beneficiaryGivenName: 'nombre',
            beneficiaryFamilyName: 'apellido',
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

  const invalidDataTypeJWT = jwt.sign(invalidDataType, 'semillaIdFamiliarKey');

  it(`validate .vc.credentialSubject['Identidad Familiar'].data.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaIdFamiliar.v1,
      invalidDataTypeJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Identidad Familiar'].data.credentialName`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Identidad%20Familiar/properties/data/properties/credentialName/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID CATEGORY

  const invalidCategory = {
    iat: 123456,
    sub: '1232123',
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: {
        'Identidad Familiar': {
          data: {
            credentialName: 'CertificadoTest',
            dni: 'dni',
            givenName: 'nombre',
            familyName: 'apellido',
            holderRelation: 'parentezco',
            beneficiaryDni: 'dni',
            beneficiaryGivenName: 'nombre',
            beneficiaryFamilyName: 'apellido',
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

  const invalidCategoryJWT = jwt.sign(invalidCategory, 'semillaIdFamiliarKey');

  it(`validate .vc.credentialSubject['Identidad Familiar'].category.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      semillaIdFamiliar.v1,
      invalidCategoryJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Identidad Familiar'].category`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Identidad%20Familiar/properties/category/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });
});

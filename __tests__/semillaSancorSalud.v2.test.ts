const { createSemicolonClassElement } = require('typescript');

const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const { validateCredential } = require('../src/validator');

import { semillaSancorSalud } from '../src/schemas/benefit';

const valid = {
  iat: 1615852880,
  sub: 'did:ethr:16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v2'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Sancor Salud': {
        category: 'benefit',
        preview: {
          type: 4,
          fields: [
            'credentialName',
            'refId',
            'policyId',
            'certId',
            'givenName',
            'familyName',
            'dni',
          ],
          cardLayout: {
            rows: [
              {
                columns: 2,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
            ],
            backgroundImage:
              'https://issuer.api.alpha.didi.org.ar/img/CredencialSancor.png',
            style: 'dark',
          },
        },
        data: {
          credentialName: 'Sancor Salud',
          policyId: 'Id',
          certId: 'cert Id',
          refId: 'Id',
          dni: 'numero de DNI',
          givenName: 'nombre',
          familyName: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const validJWT = jwt.sign(valid, 'semillaSancorSaludKey');

test('Validate ok', async () => {
  const result = await validateCredential(semillaSancorSalud.v2, validJWT);
  expect(result.status).toBe(true);
  expect(result.errors).toBe(null);
});

// INVALID SUB
const invalidSub = {
  iat: 1615852880,
  sub: 2,
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v2'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Sancor Salud': {
        category: 'benefit',
        preview: {
          type: 4,
          fields: [
            'refId',
            'policyId',
            'certId',
            'givenName',
            'familyName',
            'dni',
          ],
          cardLayout: {
            rows: [
              {
                columns: 2,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
            ],
            backgroundImage:
              'https://issuer.api.alpha.didi.org.ar/img/CredencialSancor.png',
            style: 'dark',
          },
        },
        data: {
          credentialName: 'Sancor Salud',
          policyId: 'Id',
          certId: 'cert Id',
          refId: 'Id',
          dni: 'numero de DNI',
          givenName: 'nombre',
          familyName: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const invalidSubJWT = jwt.sign(invalidSub, 'semillaSancorSaludKey');

test('Validate sub field FAIL', async () => {
  const result = await validateCredential(semillaSancorSalud.v2, invalidSubJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.sub');
  expect(result.errors[0].schemaPath).toBe('#/properties/sub/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

// INVALID ISS
const invalidIss = {
  iat: 1615852880,
  sub: 'did:ethr:16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v2'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Sancor Salud': {
        category: 'benefit',
        preview: {
          type: 4,
          fields: [
            'refId',
            'policyId',
            'certId',
            'givenName',
            'familyName',
            'dni',
          ],
          cardLayout: {
            rows: [
              {
                columns: 2,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
            ],
            backgroundImage:
              'https://issuer.api.alpha.didi.org.ar/img/CredencialSancor.png',
            style: 'dark',
          },
        },
        data: {
          credentialName: 'Sancor Salud',
          policyId: 'Id',
          certId: 'cert Id',
          refId: 'Id',
          dni: 'numero de DNI',
          givenName: 'nombre',
          familyName: 'apellido',
        },
      },
    },
  },
  iss: 3,
};

const invalidIssJWT = jwt.sign(invalidIss, 'semillaSancorSaludKey');

test('Validate iss field FAIL', async () => {
  const result = await validateCredential(semillaSancorSalud.v2, invalidIssJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.iss');
  expect(result.errors[0].schemaPath).toBe('#/properties/iss/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

// INVALID PREVIEW TYPE
const invalidPreview = {
  iat: 1615852880,
  sub: 'did:ethr:16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v2'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Sancor Salud': {
        category: 'benefit',
        preview: {
          type: '4',
          fields: [
            'refId',
            'policyId',
            'certId',
            'givenName',
            'familyName',
            'dni',
          ],
          cardLayout: {
            rows: [
              {
                columns: 2,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
            ],
            backgroundImage:
              'https://issuer.api.alpha.didi.org.ar/img/CredencialSancor.png',
            style: 'dark',
          },
        },
        data: {
          credentialName: 'Sancor Salud',
          policyId: 'Id',
          certId: 'cert Id',
          refId: 'Id',
          dni: 'numero de DNI',
          givenName: 'nombre',
          familyName: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const invalidPreviewJWT = jwt.sign(invalidPreview, 'semillaSancorSaludKey');

test(`Validate .vc.credentialSubject['Sancor Salud'].preview.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaSancorSalud.v2,
    invalidPreviewJWT,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Sancor Salud'].preview.type`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Sancor%20Salud/properties/preview/properties/type/type',
  );
  expect(result.errors[0].params.type).toBe('integer');
  expect(result.errors[0].message).toBe('should be integer');
});

// INVALID DATA TYPE
const invalidDataType = {
  iat: 1615852880,
  sub: 'did:ethr:16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v2'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Sancor Salud': {
        category: 'benefit',
        preview: {
          type: 4,
          fields: [
            'refId',
            'policyId',
            'certId',
            'givenName',
            'familyName',
            'dni',
          ],
          cardLayout: {
            rows: [
              {
                columns: 2,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
            ],
            backgroundImage:
              'https://issuer.api.alpha.didi.org.ar/img/CredencialSancor.png',
            style: 'dark',
          },
        },
        data: {
          credentialName: 5,
          policyId: 'Id',
          certId: 'cert Id',
          refId: 'Id',
          dni: 'numero de DNI',
          givenName: 'nombre',
          familyName: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const invalidDataTypeJWT = jwt.sign(invalidDataType, 'semillaSancorSaludKey');

test(`Validate .vc.credentialSubject['Sancor Salud'].data.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaSancorSalud.v2,
    invalidDataTypeJWT,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Sancor Salud'].data.credentialName`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Sancor%20Salud/properties/data/properties/credentialName/type',
  );
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

// INVALID CATEGORY
const invalidCategory = {
  iat: 1615852880,
  sub: 'did:ethr:16',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v2'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      'Sancor Salud': {
        category: 3,
        preview: {
          type: 4,
          fields: [
            'refId',
            'policyId',
            'certId',
            'givenName',
            'familyName',
            'dni',
          ],
          cardLayout: {
            rows: [
              {
                columns: 2,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
            ],
            backgroundImage:
              'https://issuer.api.alpha.didi.org.ar/img/CredencialSancor.png',
            style: 'dark',
          },
        },
        data: {
          credentialName: 'Sancor Salud',
          policyId: 'Id',
          certId: 'cert Id',
          refId: 'Id',
          dni: 'numero de DNI',
          givenName: 'nombre',
          familyName: 'apellido',
        },
      },
    },
  },
  iss: 'did:ethr:0x16',
};

const invalidCategoryJWT = jwt.sign(invalidCategory, 'semillaSancorSaludKey');

test(`Validate .vc.credentialSubject['Sancor Salud'].category.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaSancorSalud.v2,
    invalidCategoryJWT,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Sancor Salud'].category`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Sancor%20Salud/properties/category/type',
  );
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

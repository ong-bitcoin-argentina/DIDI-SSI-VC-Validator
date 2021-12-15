import { semillaEmprendimiento } from '../src/schemas/work';

const { createSemicolonClassElement } = require('typescript');

const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const { validateCredential } = require('../src/validator');

const valid = {
  iat: 123456,
  sub: '1232123',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      Emprendimiento: {
        data: {
          credentialName: 'Certificado',
          businessType: 'Tipo de Emprendimiento',
          businessStartDate: 'Inicio de Actividad',
          mainOccupation: 'Actividad Principal',
          businessName: 'Nombre del Emprendimiento',
          businessAddress: 'Domicilio del Emprendimiento',
          givenName: 'Nombre',
          familyName: 'Apellido',
        },
        category: 'work',
        preview: {
          type: 1,
          fields: [
            'credentialName',
            'businessType',
            'businessStartDate',
            'mainOccupation',
            'businessName',
            'businessAddress',
            'givenName',
            'familyName',
          ],
        },
      },
    },
  },
  iss: 'did:ethr:0x2b184203babefe306901a76b053bc38659e4a795',
};

const validJWT = jwt.sign(valid, 'emprendimientoKey');

test('validate ok', async () => {
  const result = await validateCredential(semillaEmprendimiento.v1, validJWT);
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
      Emprendimiento: {
        data: {
          credentialName: 'Certificado',
          businessType: 'Tipo de Emprendimiento',
          businessStartDate: 'Inicio de Actividad',
          mainOccupation: 'Actividad Principal',
          businessName: 'Nombre del Emprendimiento',
          businessAddress: 'Domicilio del Emprendimiento',
          givenName: 'Nombre',
          familyName: 'Apellido',
        },
        category: 'work',
        preview: {
          type: 1,
          fields: [
            'credentialName',
            'businessType',
            'businessStartDate',
            'mainOccupation',
            'businessName',
            'businessAddress',
            'givenName',
            'familyName',
          ],
        },
      },
    },
  },
  iss: 'did:ethr:0x2b184203babefe306901a76b053bc38659e4a795',
};

const invalidSubJWT = jwt.sign(invalidSub, 'emprendimientoKey');

test('validate sub field FAIL', async () => {
  const result = await validateCredential(
    semillaEmprendimiento.v1,
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
const invalisIss = {
  iat: 123456,
  sub: '1232123',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      Emprendimiento: {
        data: {
          credentialName: 'Certificado',
          businessType: 'Tipo de Emprendimiento',
          businessStartDate: 'Inicio de Actividad',
          mainOccupation: 'Actividad Principal',
          businessName: 'Nombre del Emprendimiento',
          businessAddress: 'Domicilio del Emprendimiento',
          givenName: 'Nombre',
          familyName: 'Apellido',
        },
        category: 'work',
        preview: {
          type: 1,
          fields: [
            'credentialName',
            'businessType',
            'businessStartDate',
            'mainOccupation',
            'businessName',
            'businessAddress',
            'givenName',
            'familyName',
          ],
        },
      },
    },
  },
  iss: 33,
};

const invalidIssJWT = jwt.sign(invalisIss, 'emprendimientoKey');
test('validate iss field FAIL', async () => {
  const result = await validateCredential(
    semillaEmprendimiento.v1,
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
      Emprendimiento: {
        data: {
          credentialName: 'Certificado',
          businessType: 'Tipo de Emprendimiento',
          businessStartDate: 'Inicio de Actividad',
          mainOccupation: 'Actividad Principal',
          businessName: 'Nombre del Emprendimiento',
          businessAddress: 'Domicilio del Emprendimiento',
          givenName: 'Nombre',
          familyName: 'Apellido',
        },
        category: 'work',
        preview: {
          type: '1',
          fields: [
            'credentialName',
            'businessType',
            'businessStartDate',
            'mainOccupation',
            'businessName',
            'businessAddress',
            'givenName',
            'familyName',
          ],
        },
      },
    },
  },
  iss: 'did:ethr:0x2b184203babefe306901a76b053bc38659e4a795',
};

const invalidPreviewTypeJWT = jwt.sign(invalidPreviewType, 'emprendimientoKey');

test(`validate .vc.credentialSubject.Emprendimiento.preview.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaEmprendimiento.v1,
    invalidPreviewTypeJWT,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject.Emprendimiento.preview.type`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Emprendimiento/properties/preview/properties/type/type',
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
      Emprendimiento: {
        data: {
          credentialName: 33,
          businessType: 'Tipo de Emprendimiento',
          businessStartDate: 'Inicio de Actividad',
          mainOccupation: 'Actividad Principal',
          businessName: 'Nombre del Emprendimiento',
          businessAddress: 'Domicilio del Emprendimiento',
          givenName: 'Nombre',
          familyName: 'Apellido',
        },
        category: 'work',
        preview: {
          type: 1,
          fields: [
            'credentialName',
            'businessType',
            'businessStartDate',
            'mainOccupation',
            'businessName',
            'businessAddress',
            'givenName',
            'familyName',
          ],
        },
      },
    },
  },
  iss: 'did:ethr:0x2b184203babefe306901a76b053bc38659e4a795',
};

const invalidDataTypeJWT = jwt.sign(invalidDataType, 'emprendimientoKey');

test(`validate .vc.credentialSubject.Emprendimiento.data.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaEmprendimiento.v1,
    invalidDataTypeJWT,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject.Emprendimiento.data.credentialName`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Emprendimiento/properties/data/properties/credentialName/type',
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
      Emprendimiento: {
        data: {
          credentialName: 'Certificado',
          businessType: 'Tipo de Emprendimiento',
          businessStartDate: 'Inicio de Actividad',
          mainOccupation: 'Actividad Principal',
          businessName: 'Nombre del Emprendimiento',
          businessAddress: 'Domicilio del Emprendimiento',
          givenName: 'Nombre',
          familyName: 'Apellido',
        },
        category: 33,
        preview: {
          type: 1,
          fields: [
            'credentialName',
            'businessType',
            'businessStartDate',
            'mainOccupation',
            'businessName',
            'businessAddress',
            'givenName',
            'familyName',
          ],
        },
      },
    },
  },
  iss: 'did:ethr:0x2b184203babefe306901a76b053bc38659e4a795',
};

const invalidCategoryJWT = jwt.sign(invalidCategory, 'emprendimientoKey');

test(`validate .vc.credentialSubject.Emprendimiento.category.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaEmprendimiento.v1,
    invalidCategoryJWT,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject.Emprendimiento.category`,
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Emprendimiento/properties/category/type',
  );
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

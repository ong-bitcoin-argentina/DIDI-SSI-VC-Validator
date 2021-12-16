import { livingPlace } from '../src/schemas/livingPlace';

const jwt = require('jsonwebtoken');
const { validateCredential } = require('../src/validator');

const valid = {
  iat: 123456,
  sub: '1232123',
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      Vivienda: {
        data: {
          credentialName: 'Certificado',
          livingPlaceStatus: 'Tipo de tenencia',
          livingPlaceType: 'Tipo de vivienda',
          locationType: 'Tipo de barrio',
          district: 'Distrito de Residencia',
          neighborhood: 'Barrio',
          livingPlaceGeneralConditions: 'Condiciones Generales',
          livingPlaceGasNetwork: 'Red de gas',
          livingPlaceCarefe: 'Garrafa',
          livingPlaceWaterNetwork: 'Red de Agua',
          livingPlaceWellPump: 'Pozo/Bomba',
          livingPlaceElectricityGrid: 'Instalacion de Luz',
          givenName: 'Nombre',
          familyName: 'Apellido',
        },
        category: 'livingPlace',
        preview: {
          type: 1,
          fields: [
            'credentialName',
            'livingPlaceStatus',
            'livingPlaceType',
            'locationType',
            'district',
            'neighborhood',
            'livingPlaceGeneralConditions',
            'livingPlaceGasNetwork',
            'livingPlaceCarefe',
            'livingPlaceWaterNetwork',
            'livingPlaceWellPump',
            'livingPlaceElectricityGrid',
            'givenName',
            'familyName',
          ],
        },
      },
    },
  },
  iss: 'did:ethr:16',
};

const validJWT = jwt.sign(valid, 'livingPlaceKey');

describe('livingPlace.v2.test', () => {
  it('validate ok', async () => {
    expect.assertions(2);
    const result = await validateCredential(livingPlace.v2, validJWT);
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
        Vivienda: {
          data: {
            credentialName: 'Certificado',
            livingPlaceStatus: 'Tipo de tenencia',
            livingPlaceType: 'Tipo de vivienda',
            locationType: 'Tipo de barrio',
            district: 'Distrito de Residencia',
            neighborhood: 'Barrio',
            livingPlaceGeneralConditions: 'Condiciones Generales',
            livingPlaceGasNetwork: 'Red de gas',
            livingPlaceCarefe: 'Garrafa',
            livingPlaceWaterNetwork: 'Red de Agua',
            livingPlaceWellPump: 'Pozo/Bomba',
            livingPlaceElectricityGrid: 'Instalacion de Luz',
            givenName: 'Nombre',
            familyName: 'Apellido',
          },
          category: 'livingPlace',
          preview: {
            type: 1,
            fields: [
              'credentialName',
              'livingPlaceStatus',
              'livingPlaceType',
              'locationType',
              'district',
              'neighborhood',
              'livingPlaceGeneralConditions',
              'livingPlaceGasNetwork',
              'livingPlaceCarefe',
              'livingPlaceWaterNetwork',
              'livingPlaceWellPump',
              'livingPlaceElectricityGrid',
              'givenName',
              'familyName',
            ],
          },
        },
      },
    },
    iss: 'did:ethr:16',
  };

  const invalidSubJWT = jwt.sign(invalidSub, 'livingPlaceKey');

  it('validate sub field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(livingPlace.v2, invalidSubJWT);
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
        Vivienda: {
          data: {
            credentialName: 'Certificado',
            livingPlaceStatus: 'Tipo de tenencia',
            livingPlaceType: 'Tipo de vivienda',
            locationType: 'Tipo de barrio',
            district: 'Distrito de Residencia',
            neighborhood: 'Barrio',
            livingPlaceGeneralConditions: 'Condiciones Generales',
            livingPlaceGasNetwork: 'Red de gas',
            livingPlaceCarefe: 'Garrafa',
            livingPlaceWaterNetwork: 'Red de Agua',
            livingPlaceWellPump: 'Pozo/Bomba',
            livingPlaceElectricityGrid: 'Instalacion de Luz',
            givenName: 'Nombre',
            familyName: 'Apellido',
          },
          category: 'livingPlace',
          preview: {
            type: 1,
            fields: [
              'credentialName',
              'livingPlaceStatus',
              'livingPlaceType',
              'locationType',
              'district',
              'neighborhood',
              'livingPlaceGeneralConditions',
              'livingPlaceGasNetwork',
              'livingPlaceCarefe',
              'livingPlaceWaterNetwork',
              'livingPlaceWellPump',
              'livingPlaceElectricityGrid',
              'givenName',
              'familyName',
            ],
          },
        },
      },
    },
    iss: 3,
  };

  const invalidIssJWT = jwt.sign(invalidIss, 'livingPlaceKey');

  it('validate iss field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(livingPlace.v2, invalidIssJWT);
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
        Vivienda: {
          data: {
            credentialName: 'Certificado',
            livingPlaceStatus: 'Tipo de tenencia',
            livingPlaceType: 'Tipo de vivienda',
            locationType: 'Tipo de barrio',
            district: 'Distrito de Residencia',
            neighborhood: 'Barrio',
            livingPlaceGeneralConditions: 'Condiciones Generales',
            livingPlaceGasNetwork: 'Red de gas',
            livingPlaceCarefe: 'Garrafa',
            livingPlaceWaterNetwork: 'Red de Agua',
            livingPlaceWellPump: 'Pozo/Bomba',
            livingPlaceElectricityGrid: 'Instalacion de Luz',
            givenName: 'Nombre',
            familyName: 'Apellido',
          },
          category: 'livingPlace',
          preview: {
            type: '1',
            fields: [
              'credentialName',
              'livingPlaceStatus',
              'livingPlaceType',
              'locationType',
              'district',
              'neighborhood',
              'livingPlaceGeneralConditions',
              'livingPlaceGasNetwork',
              'livingPlaceCarefe',
              'livingPlaceWaterNetwork',
              'livingPlaceWellPump',
              'livingPlaceElectricityGrid',
              'givenName',
              'familyName',
            ],
          },
        },
      },
    },
    iss: 'did:ethr:16',
  };

  const invalidPreviewTypeJWT = jwt.sign(invalidPreviewType, 'livingPlaceKey');

  it(`validate .vc.credentialSubject.Vivienda.preview.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      livingPlace.v2,
      invalidPreviewTypeJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject.Vivienda.preview.type`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Vivienda/properties/preview/properties/type/type',
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
        Vivienda: {
          data: {
            credentialName: 123,
            livingPlaceStatus: 'Tipo de tenencia',
            livingPlaceType: 'Tipo de vivienda',
            locationType: 'Tipo de barrio',
            district: 'Distrito de Residencia',
            neighborhood: 'Barrio',
            livingPlaceGeneralConditions: 'Condiciones Generales',
            livingPlaceGasNetwork: 'Red de gas',
            livingPlaceCarefe: 'Garrafa',
            livingPlaceWaterNetwork: 'Red de Agua',
            livingPlaceWellPump: 'Pozo/Bomba',
            livingPlaceElectricityGrid: 'Instalacion de Luz',
            givenName: 'Nombre',
            familyName: 'Apellido',
          },
          category: 'livingPlace',
          preview: {
            type: 1,
            fields: [
              'credentialName',
              'livingPlaceStatus',
              'livingPlaceType',
              'locationType',
              'district',
              'neighborhood',
              'livingPlaceGeneralConditions',
              'livingPlaceGasNetwork',
              'livingPlaceCarefe',
              'livingPlaceWaterNetwork',
              'livingPlaceWellPump',
              'livingPlaceElectricityGrid',
              'givenName',
              'familyName',
            ],
          },
        },
      },
    },
    iss: 'did:ethr:16',
  };

  const invalidDataTypeJWT = jwt.sign(invalidDataType, 'livingPlaceKey');

  it(`validate .vc.credentialSubject.Vivienda.data.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(livingPlace.v2, invalidDataTypeJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject.Vivienda.data.credentialName`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Vivienda/properties/data/properties/credentialName/type',
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
        Vivienda: {
          data: {
            credentialName: 'Certificado',
            livingPlaceStatus: 'Tipo de tenencia',
            livingPlaceType: 'Tipo de vivienda',
            locationType: 'Tipo de barrio',
            district: 'Distrito de Residencia',
            livingPlaceGeneralConditions: 'Condiciones Generales',
            livingPlaceGasNetwork: 'Red de gas',
            livingPlaceCarefe: 'Garrafa',
            livingPlaceWaterNetwork: 'Red de Agua',
            livingPlaceWellPump: 'Pozo/Bomba',
            livingPlaceElectricityGrid: 'Instalacion de Luz',
            givenName: 'Nombre',
            familyName: 'Apellido',
          },
          category: 1,
          preview: {
            type: 1,
            fields: [
              'credentialName',
              'livingPlaceStatus',
              'livingPlaceType',
              'locationType',
              'district',
              'livingPlaceGeneralConditions',
              'livingPlaceGasNetwork',
              'livingPlaceCarefe',
              'livingPlaceWaterNetwork',
              'livingPlaceWellPump',
              'livingPlaceElectricityGrid',
              'givenName',
              'familyName',
            ],
          },
        },
      },
    },
    iss: 'did:ethr:16',
  };

  const invalidCategoryJWT = jwt.sign(invalidCategory, 'livingPlaceKey');

  it(`validate .vc.credentialSubject.Vivienda.category.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(livingPlace.v2, invalidCategoryJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject.Vivienda.category`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Vivienda/properties/category/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });
});

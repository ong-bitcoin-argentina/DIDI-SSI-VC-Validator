const jwt = require('jsonwebtoken');
const { validateMessageRes } = require('../src/validator');

const valid = {
  iat: 33,
  type: 'shareResp',
  aud: '0xaud',
  iss: 'did:ethr:firmante',
  exp: 9,
  req: ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjMzLCJ0eXBlIjoic2hhcmVSZXNwIiwiYXVkIjoiMHhhdWQiLCJpc3MiOiJkaWQ6ZXRocjpmaXJtYW50ZSIsImV4cCI6OSwicmVxIjoicmVxIiwidmMiOlt7ImlhdCI6MzMsInR5cGUiOiJzaGFyZVJlc3AiLCJhdWQiOiIweGF1ZCIsImlzcyI6ImRpZDpldGhyOmZpcm1hbnRlIiwic3ViIjoic3ViIiwiY2xhaW0iOnsibmFtZSI6IkNhcm9sIENyeXB0ZWF1IiwiZXNzZW50aWFsIjp0cnVlLCJpc3MiOlt7ImRpZCI6ImRpZDp3ZWI6aWR2ZXJpZmllci5jbGFpbXMiLCJ1cmwiOiJodHRwczovL2lkdmVyaWZpZXIuZXhhbXBsZSJ9XSwicmVhc29uIjoiVG8gbGVnYWxseSBiZSBhYmxlIHRvIHNlbmQgeW91IGEgdGV4dCJ9LCJleHAiOjl9XX0.qysHemTA8JSIVPWMYj6dDoAj7TU1jy4cTwrGKbKL9Rk',
  vc: [
    {
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
    },
  ],
};

const validJWT = jwt.sign(valid, 'shareRespKey');

describe('shareResp.v1.test', () => {
  it('validate ok', async () => {
    expect.assertions(2);
    const result = await validateMessageRes(validJWT);
    expect(result.status).toBe(true);
    expect(result.errors).toBeNull();
  });

  // INVALID ISS
  const invalidIss = {
    iat: 33,
    type: 'shareResp',
    aud: '0xaud',
    iss: 7,
    exp: 9,
    req: ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjMzLCJ0eXBlIjoic2hhcmVSZXNwIiwiYXVkIjoiMHhhdWQiLCJpc3MiOiJkaWQ6ZXRocjpmaXJtYW50ZSIsImV4cCI6OSwicmVxIjoicmVxIiwidmMiOlt7ImlhdCI6MzMsInR5cGUiOiJzaGFyZVJlc3AiLCJhdWQiOiIweGF1ZCIsImlzcyI6ImRpZDpldGhyOmZpcm1hbnRlIiwic3ViIjoic3ViIiwiY2xhaW0iOnsibmFtZSI6IkNhcm9sIENyeXB0ZWF1IiwiZXNzZW50aWFsIjp0cnVlLCJpc3MiOlt7ImRpZCI6ImRpZDp3ZWI6aWR2ZXJpZmllci5jbGFpbXMiLCJ1cmwiOiJodHRwczovL2lkdmVyaWZpZXIuZXhhbXBsZSJ9XSwicmVhc29uIjoiVG8gbGVnYWxseSBiZSBhYmxlIHRvIHNlbmQgeW91IGEgdGV4dCJ9LCJleHAiOjl9XX0.qysHemTA8JSIVPWMYj6dDoAj7TU1jy4cTwrGKbKL9Rk',
  };

  const invalidIssJWT = jwt.sign(invalidIss, 'shareRespKey');

  it('validate iss field FAIL', async () => {
    expect.assertions(6);
    const result = await validateMessageRes(invalidIssJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.iss');
    expect(result.errors[0].schemaPath).toBe('#/properties/iss/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID AUD
  const invalidAud = {
    iat: 33,
    type: 'shareResp',
    aud: 9,
    iss: 'did:ethr:firmante',
  };

  const invalidAudJWT = jwt.sign(invalidAud, 'shareRespKey');

  it('validate Aud field FAIL', async () => {
    expect.assertions(6);
    const result = await validateMessageRes(invalidAudJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.aud');
    expect(result.errors[0].schemaPath).toBe('#/properties/aud/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID EXP
  const invalidExpJWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjMzLCJ0eXBlIjoic2hhcmVSZXNwIiwiYXVkIjoiMHhhdWQiLCJpc3MiOiJkaWQ6ZXRocjpmaXJtYW50ZSIsImV4cCI6IjkiLCJyZXEiOiJyZXEiLCJ2YyI6W3siaWF0IjozMywidHlwZSI6InNoYXJlUmVzcCIsImF1ZCI6IjB4YXVkIiwiaXNzIjoiZGlkOmV0aHI6ZmlybWFudGUiLCJzdWIiOiJzdWIiLCJjbGFpbSI6eyJuYW1lIjoiQ2Fyb2wgQ3J5cHRlYXUifSwiZXhwIjo5fV19._kmVDiYPGS2uJpbl6eGgtm9JI58FqPnMjvGIYePJzmE';

  it('validate Exp field FAIL', async () => {
    expect.assertions(6);
    const result = await validateMessageRes(invalidExpJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.exp');
    expect(result.errors[0].schemaPath).toBe('#/properties/exp/type');
    expect(result.errors[0].params.type).toBe('integer');
    expect(result.errors[0].message).toBe('should be integer');
  });

  // INVALID TYPE OF TYPE
  const invalidType = {
    iat: 33,
    type: 3,
    aud: '0xaud',
    iss: 'did:ethr:firmante',
  };

  const invalidTypeJWT = jwt.sign(invalidType, 'shareRespKey');

  it('validate type field FAIL', async () => {
    expect.assertions(6);
    const result = await validateMessageRes(invalidTypeJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.type');
    expect(result.errors[0].schemaPath).toBe('#/properties/type/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID IAT TYPE;
  const invalidIatJWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIzMyIsInR5cGUiOiJzaGFyZVJlc3AiLCJhdWQiOiIweGF1ZCIsImlzcyI6ImRpZDpldGhyOmZpcm1hbnRlIiwiZXhwIjo5LCJyZXEiOiJyZXEiLCJ2YyI6W3siaWF0IjozMywidHlwZSI6InNoYXJlUmVzcCIsImF1ZCI6IjB4YXVkIiwiaXNzIjoiZGlkOmV0aHI6ZmlybWFudGUiLCJzdWIiOiJzdWIiLCJjbGFpbSI6eyJuYW1lIjoiQ2Fyb2wgQ3J5cHRlYXUifSwiZXhwIjo5fV19.sOIc7GNR_9Dxcs2g8F_Rf7EsCWZaQtRK0ql9sQvOaM4';

  it('validate Iat field FAIL', async () => {
    expect.assertions(6);
    const result = await validateMessageRes(invalidIatJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.iat');
    expect(result.errors[0].schemaPath).toBe('#/properties/iat/type');
    expect(result.errors[0].params.type).toBe('integer');
    expect(result.errors[0].message).toBe('should be integer');
  });

  // INVALID REQ TYPE
  const invalidReq = {
    iat: 33,
    type: 'shareResp',
    aud: '0xaud',
    iss: 'did:ethr:firmante',
    exp: 9,
    req: 3,
  };

  const invalidReqJWT = jwt.sign(invalidReq, 'shareRespKey');

  it('validate Req field FAIL', async () => {
    expect.assertions(6);
    const result = await validateMessageRes(invalidReqJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.req');
    expect(result.errors[0].schemaPath).toBe('#/properties/req/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  const invalidFirtCredential = {
    iat: 33,
    type: 'shareResp',
    aud: '0xaud',
    iss: 'did:ethr:firmante',
    exp: 9,
    req: 'req',
    vc: [
      {
        iat: 16,
        sub: 7,
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
      },
    ],
  };

  const invalidFirtCredentialJWT = jwt.sign(
    invalidFirtCredential,
    'shareRespKey',
  );

  it(`validate first credential sub field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateMessageRes(invalidFirtCredentialJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.sub');
    expect(result.errors[0].schemaPath).toBe('#/properties/sub/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  const invalidSecondCredential = {
    iat: 33,
    type: 'shareResp',
    aud: '0xaud',
    iss: 'did:ethr:firmante',
    exp: 9,
    req: ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjMzLCJ0eXBlIjoic2hhcmVSZXNwIiwiYXVkIjoiMHhhdWQiLCJpc3MiOiJkaWQ6ZXRocjpmaXJtYW50ZSIsImV4cCI6OSwicmVxIjoicmVxIiwidmMiOlt7ImlhdCI6MzMsInR5cGUiOiJzaGFyZVJlc3AiLCJhdWQiOiIweGF1ZCIsImlzcyI6ImRpZDpldGhyOmZpcm1hbnRlIiwic3ViIjoic3ViIiwiY2xhaW0iOnsibmFtZSI6IkNhcm9sIENyeXB0ZWF1IiwiZXNzZW50aWFsIjp0cnVlLCJpc3MiOlt7ImRpZCI6ImRpZDp3ZWI6aWR2ZXJpZmllci5jbGFpbXMiLCJ1cmwiOiJodHRwczovL2lkdmVyaWZpZXIuZXhhbXBsZSJ9XSwicmVhc29uIjoiVG8gbGVnYWxseSBiZSBhYmxlIHRvIHNlbmQgeW91IGEgdGV4dCJ9LCJleHAiOjl9XX0.qysHemTA8JSIVPWMYj6dDoAj7TU1jy4cTwrGKbKL9Rk',
    vc: [
      {
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
      },
      {
        iat: 1595346549,
        sub: 'did:ethr:0x3bc78fbf2b14195f8971d6c2551093e52c879b8b',
        vc: {
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          type: ['VerifiableCredential'],
          credentialSubject: {
            'Domicilio Legal': {
              preview: {
                fields: [
                  'streetAddress',
                  'numberStreet',
                  'zipCode',
                  'city',
                  'province',
                  'country',
                ],
                type: 1,
              },
              category: 3,
              data: {
                streetAddress: 'AV. DEL LIBERTADOR',
                numberStreet: '4730',
                floor: '8',
                department: 'B',
                zipCode: '1426',
                city: 'BELGRANO',
                municipality: 'CIUDAD DE BUENOS AIRES',
                province: 'CIUDAD DE BUENOS AIRES',
                country: 'ARGENTINA',
              },
            },
          },
        },
        iss: 'did:ethr:0x5109e37015c915ca2fd585a4105cf54eabca17f8',
      },
    ],
  };

  const invalidSecondCredentialJWT = jwt.sign(
    invalidSecondCredential,
    'shareRespKey',
  );
  it(`validate second credential credentialSubject[Domicilio Legal].category field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateMessageRes(invalidSecondCredentialJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Domicilio Legal'].category`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Domicilio%20Legal/properties/category/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });
});

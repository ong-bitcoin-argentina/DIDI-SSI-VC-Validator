import { shareRequestSchema } from '../src/messages';

const jwt = require('jsonwebtoken');
const { validateCredential } = require('../src/validator');

const valid = {
  iat: 33,
  callback: 'callback',
  type: 'shareReq',
  claims: {
    verifiable: {
      semillaSembFamiliar: {
        essential: true,
        issuers: [
          {
            did: 'did:web:idverifier.claims',
            url: 'https://idverifier.example',
          },
        ],
        reason: 'To legally be able to ...',
      },

      semillaSancorSalud: {
        essential: true,
        issuers: [
          {
            did: 'did:web:idverifier.claims',
            url: 'https://idverifier.example',
          },
        ],
        reason: 'To legally be able to ...',
      },

      mobilePhone: {
        essential: true,
        issuers: [
          {
            did: 'did:web:idverifier.claims',
            url: 'https://idverifier.example',
          },
        ],
        reason: 'To legally be able to send you a text',
      },
    },
  },
  aud: '0xaud',
  iss: 'did:ethr:firmante',
};

const validJWT = jwt.sign(valid, 'sharedResquestKey');

describe('shareRequest.v1.test', () => {
  it('validate ok', async () => {
    expect.assertions(2);
    const result = await validateCredential(shareRequestSchema.v1, validJWT);
    expect(result.status).toBe(true);
    expect(result.errors).toBeNull();
  });
  // INVALID SUB
  const invalidIss = {
    iat: 33,
    callback: 'callback',
    type: 'shareReq',
    claims: {
      verifiable: {
        emailMain: {
          issuers: [
            {
              did: 'did:web:uport.claims',
              url: 'https://uport.claims/email',
            },
            {
              did: 'did:web:url.com',
              url: 'https://url.com',
            },
          ],
          reason: 'Whe need to be able to email you',
        },
        nationalId: {
          essential: true,
          issuers: [
            {
              did: 'did:web:idverifier.claims',
              url: 'https://idverifier.example',
            },
          ],
          reason: 'To legally be able to open your account',
        },
      },
    },
    aud: '0xaud',
    iss: 5,
  };

  const invalidIssJWT = jwt.sign(invalidIss, 'shareRequestKey');

  it('validate iss field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(
      shareRequestSchema.v1,
      invalidIssJWT,
    );
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
    callback: 'callback',
    type: 'shareReq',
    claims: {
      verifiable: {
        emailMain: {
          issuers: [
            {
              did: 'did:web:uport.claims',
              url: 'https://uport.claims/email',
            },
            {
              did: 'did:web:url.com',
              url: 'https://url.com',
            },
          ],
          reason: 'Whe need to be able to email you',
        },
        nationalId: {
          essential: true,
          issuers: [
            {
              did: 'did:web:idverifier.claims',
              url: 'https://idverifier.example',
            },
          ],
          reason: 'To legally be able to open your account',
        },
      },
    },
    aud: 9,
    iss: 'did:ethr:firmante',
  };

  const invalidAudJWT = jwt.sign(invalidAud, 'shareRequestKey');

  it('validate Aud field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(
      shareRequestSchema.v1,
      invalidAudJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.aud');
    expect(result.errors[0].schemaPath).toBe('#/properties/aud/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID TYPE TYPE
  const invalidType = {
    iat: 33,
    callback: 'callback',
    type: 3,
    claims: {
      verifiable: {
        emailMain: {
          issuers: [
            {
              did: 'did:web:uport.claims',
              url: 'https://uport.claims/email',
            },
            {
              did: 'did:web:url.com',
              url: 'https://url.com',
            },
          ],
          reason: 'Whe need to be able to email you',
        },
        nationalId: {
          essential: true,
          issuers: [
            {
              did: 'did:web:idverifier.claims',
              url: 'https://idverifier.example',
            },
          ],
          reason: 'To legally be able to open your account',
        },
      },
    },
    aud: '0xaud',
    iss: 'did:ethr:firmante',
  };

  const invalidTypeJWT = jwt.sign(invalidType, 'shareRequestKey');

  it('validate type field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(
      shareRequestSchema.v1,
      invalidTypeJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.type');
    expect(result.errors[0].schemaPath).toBe('#/properties/type/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID CALLBACK TYPE
  const invalidCallback = {
    iat: 33,
    callback: 7,
    type: 'shareReq',
    claims: {
      verifiable: {
        emailMain: {
          issuers: [
            {
              did: 'did:web:uport.claims',
              url: 'https://uport.claims/email',
            },
            {
              did: 'did:web:url.com',
              url: 'https://url.com',
            },
          ],
          reason: 'Whe need to be able to email you',
        },
        nationalId: {
          essential: true,
          issuers: [
            {
              did: 'did:web:idverifier.claims',
              url: 'https://idverifier.example',
            },
          ],
          reason: 'To legally be able to open your account',
        },
      },
    },
    aud: '0xaud',
    iss: 'did:ethr:firmante',
  };

  const invalidCallbackJWT = jwt.sign(invalidCallback, 'shareRequestKey');

  it('validate Callback field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(
      shareRequestSchema.v1,
      invalidCallbackJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.callback');
    expect(result.errors[0].schemaPath).toBe('#/properties/callback/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID DID TYPE

  const invalidDidType = {
    iat: 33,
    callback: 'callback',
    type: 'shareReq',
    claims: {
      verifiable: {
        emailMain: {
          issuers: [
            {
              did: 3,
              url: 'https://uport.claims/email',
            },
            {
              did: 'did:web:url.com',
              url: 'https://url.com',
            },
          ],
          reason: 'Whe need to be able to email you',
        },
        nationalId: {
          essential: true,
          issuers: [
            {
              did: 'did:web:idverifier.claims',
              url: 'https://idverifier.example',
            },
          ],
          reason: 'To legally be able to open your account',
        },
      },
    },
    aud: '0xaud',
    iss: 'did:ethr:firmante',
  };

  const invalidDidTypeJWT = jwt.sign(invalidDidType, 'shareRequestKey');

  it(`validate .claims.verifiable.emailMain.iss.did.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      shareRequestSchema.v1,
      invalidDidTypeJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      '.claims.verifiable.emailMain.issuers[0].did',
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/claims/properties/verifiable/properties/emailMain/properties/issuers/items/0/properties/did/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID URL TYPE
  const invalidUrlType = {
    iat: 33,
    callback: 'callback',
    type: 'shareReq',
    claims: {
      verifiable: {
        emailMain: {
          issuers: [
            {
              did: 'did:web:uport.claims',
              url: 7,
            },
            {
              did: 'did:web:url.com',
            },
          ],
          reason: 'Whe need to be able to email you',
        },
        nationalId: {
          essential: true,
          issuers: [
            {
              did: 'did:web:idverifier.claims',
              url: 'https://idverifier.example',
            },
          ],
          reason: 'To legally be able to open your account',
        },
      },
    },
    aud: '0xaud',
    iss: 'did:ethr:firmante',
  };

  const invalidUrlTypeJWT = jwt.sign(invalidUrlType, 'shareRequestKey');

  it(`validate .claims.verifiable.emailMain.iss.url.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      shareRequestSchema.v1,
      invalidUrlTypeJWT,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      '.claims.verifiable.emailMain.issuers[0].url',
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/claims/properties/verifiable/properties/emailMain/properties/issuers/items/0/properties/url/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID VERIFIABLE DATA TYPE
  const invalidVerifiableDataType = {
    iat: 33,
    callback: 'callback',
    type: 'shareReq',
    claims: {
      verifiable: {
        emailMain: {
          issuers: [
            {
              did: 'did:web:uport.claims',
              url: 'https://uport.claims/email',
            },
            {
              did: 'did:web:url.com',
              url: 'https://url.com',
            },
          ],
          reason: 88,
        },
        nationalId: {
          essential: true,
          issuers: [
            {
              did: 'did:web:idverifier.claims',
              url: 'https://idverifier.example',
            },
          ],
          reason: 'To legally be able to open your account',
        },
      },
    },
    aud: '0xaud',
    iss: 'did:ethr:firmante',
  };

  const invalidVerifiableDataTypeJWT = jwt.sign(
    invalidVerifiableDataType,
    'shareRequestKey',
  );

  it(`validate .claims.verifiable.emailMain.reason.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      shareRequestSchema.v1,
      invalidVerifiableDataTypeJWT,
    );

    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      '.claims.verifiable.emailMain.reason',
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/claims/properties/verifiable/properties/emailMain/properties/reason/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });
});

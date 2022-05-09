import { shareRespSchema } from '../src/messages';

const jwt = require('jsonwebtoken');
const { validateCredential } = require('../src/validator');

const valid = {
  iat: 33,
  type: 'shareResp',
  aud: '0xaud',
  iss: 'did:ethr:firmante',
  exp: 9,
  req: 'req',
  vc: [
    {
      iat: 33,
      type: 'shareResp',
      aud: '0xaud',
      iss: 'did:ethr:firmante',
      sub: 'sub',
      claim: {
        name: 'Carol Crypteau',
      },
      exp: 9,
    },
  ],
};

const validJWT = jwt.sign(valid, 'shareRespKey');

describe('shareResp.v1.test', () => {
  it('validate ok', async () => {
    expect.assertions(2);
    const result = await validateCredential(shareRespSchema.v1, validJWT);
    expect(result.status).toBe(true);
    expect(result.errors).toBeNull();
  });

  // INVALID ISS
  const invalidIss = {
    iat: 33,
    type: 'shareResp',
    aud: '0xaud',
    iss: 5,
  };

  const invalidIssJWT = jwt.sign(invalidIss, 'shareRespKey');

  it('validate iss field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(shareRespSchema.v1, invalidIssJWT);
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
    const result = await validateCredential(shareRespSchema.v1, invalidAudJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.aud');
    expect(result.errors[0].schemaPath).toBe('#/properties/aud/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID EXP
  const invalidExp = {
    iat: 33,
    type: 'shareResp',
    aud: 9,
    iss: 'did:ethr:firmante',
  };

  const invalidExpJWT = jwt.sign(invalidExp, 'shareRespKey');

  it('validate Exp field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(shareRespSchema.v1, invalidExpJWT);
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
    const result = await validateCredential(shareRespSchema.v1, invalidTypeJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.type');
    expect(result.errors[0].schemaPath).toBe('#/properties/type/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID IAT TYPE
  const invalidIat = {
    iat: '23',
    type: 'shareResp',
    aud: '0xaud',
    iss: 2,
  };

  const invalidIatJWT = jwt.sign(invalidIat, 'shareRespKey');

  it('validate Iat field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(shareRespSchema.v1, invalidIatJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.iat');
    expect(result.errors[0].schemaPath).toBe('#/properties/iat/type');
    expect(result.errors[0].params.type).toBe('integer');
    expect(result.errors[0].message).toBe('should be integer');
  });

  // INVALID REQ TYPE
  const invalidReq = {
    iat: '23',
    type: 'shareResp',
    req: 2,
    aud: '0xaud',
    iss: 2,
  };

  const invalidReqJWT = jwt.sign(invalidReq, 'shareRespKey');

  it('validate Req field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(shareRespSchema.v1, invalidReqJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.req');
    expect(result.errors[0].schemaPath).toBe('#/properties/req/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  // INVALID VC TYPE
  const invalidVc = {
    iat: '23',
    type: 'shareResp',
    req: 2,
    aud: '0xaud',
    iss: 2,
    vc: {},
  };

  const invalidVcJWT = jwt.sign(invalidVc, 'shareRespKey');

  it('validate Vc field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(shareRespSchema.v1, invalidVcJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.vc');
    expect(result.errors[0].schemaPath).toBe('#/properties/vc/type');
    expect(result.errors[0].params.type).toBe('array');
    expect(result.errors[0].message).toBe('should be array');
  });
});

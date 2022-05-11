import { getTypes } from '../credentialList';

const types = getTypes();

const verifiableProperties = types.reduce((_acc: any, valor: string) => {
  // eslint-disable-next-line no-param-reassign
  _acc[valor] = {
    type: 'object',
    properties: {
      essential: {
        type: 'boolean',
      },
      iss: {
        type: 'array',
        items: [
          {
            type: 'object',
            properties: {
              did: {
                type: 'string',
              },
              url: {
                type: 'string',
              },
            },
            required: ['url', 'did'],
          },
        ],
      },
      reason: {
        type: 'string',
      },
    },
    required: ['iss', 'reason'],
  };
  return _acc;
}, {});

export const verifedClaims = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
    },
    iss: {
      type: 'string',
    },
    sub: {
      type: 'string',
    },
    iat: {
      type: 'integer',
    },
    exp: {
      type: 'integer',
    },
    claim: {
      type: 'object',
      properties: verifiableProperties,
    },
  },
  required: ['iss', 'sub', 'iat', 'claim'],
};

export const v1 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
    },
    iss: {
      type: 'string',
    },
    aud: {
      type: 'string',
    },
    iat: {
      type: 'integer',
    },
    exp: {
      type: 'integer',
    },
    req: {
      type: 'string',
    },
    vc: {
      type: 'array',
      items: [verifedClaims],
    },
  },
  required: ['iss', 'type', 'aud', 'iat', 'exp'],
};

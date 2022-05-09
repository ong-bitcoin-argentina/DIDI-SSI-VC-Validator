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
      issuers: {
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
    required: ['issuers', 'reason'],
  };
  return _acc;
}, {});

export const v1 = {
  type: 'object',
  properties: {
    iat: {
      type: 'integer',
    },
    callback: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    claims: {
      type: 'object',
      properties: {
        verifiable: {
          type: 'object',
          properties: verifiableProperties,
          required: [],
        },
      },
      required: ['verifiable'],
    },
    aud: {
      type: 'string',
    },
    iss: {
      type: 'string',
    },
  },
  required: ['iat', 'callback', 'type', 'claims', 'aud', 'iss'],
};

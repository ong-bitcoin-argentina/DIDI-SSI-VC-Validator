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
      items: [
        {
          type: 'object',
        },
      ],
    },
  },
  required: ['iss', 'type', 'aud', 'iat', 'exp'],
};

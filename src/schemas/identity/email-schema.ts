export const v1 = {
  type: 'object',
  properties: {
    iat: {
      type: 'integer',
    },
    sub: {
      type: 'string',
    },
    vc: {
      type: 'object',
      properties: {
        '@context': {
          type: 'array',
          items: [
            {
              type: 'string',
            },
          ],
        },
        type: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
          ],
        },
        credentialSubject: {
          type: 'object',
          properties: {
            Email: {
              type: 'object',
              properties: {
                preview: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'integer',
                    },
                    fields: {
                      type: 'array',
                      items: [
                        {
                          type: 'string',
                        },
                      ],
                    },
                  },
                  required: ['type', 'fields'],
                },
                category: {
                  type: 'string',
                },
                data: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                    },
                  },
                  required: ['email'],
                },
              },
              required: ['preview', 'category', 'data'],
            },
          },
          required: ['Email'],
        },
      },
      required: ['@context', 'type', 'credentialSubject'],
    },
    iss: {
      type: 'string',
    },
  },
  required: ['iat', 'sub', 'vc', 'iss'],
};

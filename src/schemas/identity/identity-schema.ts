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
            'Datos Personales': {
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
                    'Numero de Identidad': {
                      type: 'string',
                    },
                    'Nombre(s)': {
                      type: 'string',
                    },
                    'Apellido(s)': {
                      type: 'string',
                    },
                    Nacionalidad: {
                      type: 'string',
                    },
                  },
                  required: [
                    'Numero de Identidad',
                    'Nombre(s)',
                    'Apellido(s)',
                    'Nacionalidad',
                  ],
                },
              },
              required: ['preview', 'category', 'data'],
            },
          },
          required: ['Datos Personales'],
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

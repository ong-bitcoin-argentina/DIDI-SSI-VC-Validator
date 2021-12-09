export const v2 = {
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
            'Sembrando - Titular': {
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
                    credentialName: {
                      type: 'string',
                    },
                    dni: {
                      type: 'string',
                    },
                    benefitHolderType: {
                      type: 'string',
                    },
                    givenName: {
                      type: 'string',
                    },
                    familyName: {
                      type: 'string',
                    },
                  },
                  required: [
                    'credentialName',
                    'dni',
                    'givenName',
                    'familyName',
                  ],
                },
              },
              required: ['preview', 'category', 'data'],
            },
          },
          required: ['Sembrando - Titular'],
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
            'Semillas Beneficio': {
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
                    'CERTIFICADO O CURSO': {
                      type: 'string',
                    },
                    'Dni Beneficiario': {
                      type: 'string',
                    },
                    Caracter: {
                      type: 'string',
                    },
                    NOMBRE: {
                      type: 'string',
                    },
                    APELLIDO: {
                      type: 'string',
                    },
                  },
                  required: [
                    'CERTIFICADO O CURSO',
                    'Dni Beneficiario',
                    'NOMBRE',
                    'APELLIDO',
                  ],
                },
              },
              required: ['preview', 'category', 'data'],
            },
          },
          required: ['Semillas Beneficio'],
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

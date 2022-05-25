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
            'Domicilio Legal': {
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
                    Domicilio: {
                      type: 'string',
                    },
                    Piso: {
                      type: 'string',
                    },
                    Departamento: {
                      type: 'string',
                    },
                    'Código Postal': {
                      type: 'string',
                    },
                    'Ciudad/Barrio': {
                      type: 'string',
                    },
                    'Departamento/Municipalidad': {
                      type: 'string',
                    },
                    Provincia: {
                      type: 'string',
                    },
                    País: {
                      type: 'string',
                    },
                  },
                  required: [
                    'Domicilio',
                    'Ciudad/Barrio',
                    'Departamento/Municipalidad',
                    'Provincia',
                    'País',
                  ],
                },
              },
              required: ['preview', 'category', 'data'],
            },
          },
          required: ['Domicilio Legal'],
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
            'Domicilio Legal': {
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
                    streetAddress: {
                      type: 'string',
                    },
                    numberStreet: {
                      type: 'string',
                    },
                    floor: {
                      type: 'string',
                    },
                    department: {
                      type: 'string',
                    },
                    zipCode: {
                      type: 'string',
                    },
                    city: {
                      type: 'string',
                    },
                    municipality: {
                      type: 'string',
                    },
                    province: {
                      type: 'string',
                    },
                    country: {
                      type: 'string',
                    },
                  },
                  required: [
                    'streetAddress',
                    'numberStreet',
                    'floor',
                    'department',
                    'zipCode',
                    'city',
                    'municipality',
                    'province',
                    'country',
                  ],
                },
              },
              required: ['preview', 'category', 'data'],
            },
          },
          required: ['Domicilio Legal'],
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

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
            'Semillas Crediticia': {
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
                    creditId: {
                      type: 'string',
                    },
                    creditType: {
                      type: 'string',
                    },
                    creditGroupID: {
                      type: 'string',
                    },
                    creditCycle: {
                      type: 'string',
                    },
                    creditStatus: {
                      type: 'string',
                    },
                    creditTotalAmount: {
                      type: 'string',
                    },
                    creditBalanceDue: {
                      type: 'string',
                    },
                    creditCurrentInstallment: {
                      type: 'string',
                    },
                    creditTotalInstallments: {
                      type: 'string',
                    },
                    creditDatePaymentDue: {
                      type: 'string',
                    },
                    creditStartDate: {
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
                    'creditStatus',
                    'creditTotalAmount',
                    'creditCurrentInstallment',
                    'creditTotalInstallments',
                    'creditStartDate',
                    'givenName',
                    'familyName',
                  ],
                },
              },
              required: ['preview', 'category', 'data'],
            },
          },
          required: ['Semillas Crediticia'],
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
            'Semillas Crediticia': {
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
                    'Dni Titular': {
                      type: 'string',
                    },
                    'Id Credito': {
                      type: 'string',
                    },
                    'Tipo de Credito': {
                      type: 'string',
                    },
                    'Id Grupo': {
                      type: 'string',
                    },
                    'Ciclo del Credito': {
                      type: 'string',
                    },
                    'Estado de Credito': {
                      type: 'string',
                    },
                    'Monto total del Credito [$]': {
                      type: 'string',
                    },
                    'Saldo Vencido': {
                      type: 'string',
                    },
                    'Cuota Actual': {
                      type: 'string',
                    },
                    'Cuotas Totales': {
                      type: 'string',
                    },
                    'Fecha de Vencimiento de Cuota': {
                      type: 'string',
                    },
                    'Fecha de inicio': {
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
                    'Dni Titular',
                    'Estado de Credito',
                    'Monto total del Credito [$]',
                    'Cuota Actual',
                    'Cuotas Totales',
                    'Fecha de inicio',
                    'NOMBRE',
                    'APELLIDO',
                  ],
                },
              },
              required: ['preview', 'category', 'data'],
            },
          },
          required: ['Semillas Crediticia'],
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

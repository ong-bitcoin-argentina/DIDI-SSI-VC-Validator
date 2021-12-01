export const v2 = {
  type: "object",
  properties: {
    iat: {
      type: "integer",
    },
    sub: {
      type: "string",
    },
    vc: {
      type: "object",
      properties: {
        "@context": {
          type: "array",
          items: [
            {
              type: "string",
            },
          ],
        },
        type: {
          type: "array",
          items: [
            {
              type: "string",
            },
          ],
        },
        credentialSubject: {
          type: "object",
          properties: {
            "Sancor Salud": {
              type: "object",
              properties: {
                preview: {
                  type: "object",
                  properties: {
                    type: {
                      type: "integer",
                    },
                    fields: {
                      type: "array",
                      items: [
                        {
                          type: "string",
                        },
                      ],
                    },
                    cardLayout: {
                      type: "object",
                      properties: {
                        rows: {
                          type: "array",
                          items: [
                            {
                              columns: "integer",
                            },
                            {
                              columns: "integer",
                            },
                            {
                              columns: "integer",
                            },
                            {
                              columns: "integer",
                            },
                          ],
                        },
                      },
                    },
                    backgroundImage: {
                      type: "string",
                    },
                    style: {
                      type: "string",
                    },
                  },
                  required: ["type", "fields"],
                },
                category: {
                  type: "string",
                },
                data: {
                  type: "object",
                  properties: {
                    credentialName: {
                      type: "string",
                    },
                    policyId: {
                      type: "string",
                    },
                    certId: {
                      type: "string",
                    },
                    refId: {
                      type: "string",
                    },
                    dni: {
                      type: "string",
                    },
                    givenName: {
                      type: "string",
                    },
                    familyName: {
                      type: "string",
                    },
                  },
                  required: [
                    "credentialName",
                    "policyId",
                    "certId",
                    "refId",
                    "dni",
                    "givenName",
                    "familyName",
                  ],
                },
              },
              required: ["preview", "category", "data"],
            },
          },
          required: ["Sancor Salud"],
        },
      },
      required: ["@context", "type", "credentialSubject"],
    },
    iss: {
      type: "string",
    },
  },
  required: ["iat", "sub", "vc", "iss"],
};

export const v1 = {
  type: "object",
  properties: {
    iat: {
      type: "integer",
    },
    sub: {
      type: "string",
    },
    vc: {
      type: "object",
      properties: {
        "@context": {
          type: "array",
          items: [
            {
              type: "string",
            },
          ],
        },
        type: {
          type: "array",
          items: [
            {
              type: "string",
            },
          ],
        },
        credentialSubject: {
          type: "object",
          properties: {
            "Sancor Salud": {
              type: "object",
              properties: {
                preview: {
                  type: "object",
                  properties: {
                    type: {
                      type: "integer",
                    },
                    fields: {
                      type: "array",
                      items: [
                        {
                          type: "string",
                        },
                      ],
                    },
                    cardLayout: {
                      type: "object",
                      properties: {
                        rows: {
                          type: "array",
                          items: [
                            {
                              columns: "integer",
                            },
                            {
                              columns: "integer",
                            },
                            {
                              columns: "integer",
                            },
                            {
                              columns: "integer",
                            },
                          ],
                        },
                      },
                    },
                    backgroundImage: {
                      type: "string",
                    },
                    style: {
                      type: "string",
                    },
                  },
                  required: ["type", "fields"],
                },
                category: {
                  type: "string",
                },
                data: {
                  type: "object",
                  properties: {
                    "CERTIFICADO O CURSO": {
                      type: "string",
                    },
                    POLIZA: {
                      type: "string",
                    },
                    CERT: {
                      type: "string",
                    },
                    REF: {
                      type: "string",
                    },
                    DNI: {
                      type: "string",
                    },
                    NOMBRE: {
                      type: "string",
                    },
                    APELLIDO: {
                      type: "string",
                    },
                  },
                  required: [
                    "CERTIFICADO O CURSO",
                    "POLIZA",
                    "CERT",
                    "REF",
                    "DNI",
                    "NOMBRE",
                    "APELLIDO",
                  ],
                },
              },
              required: ["preview", "category", "data"],
            },
          },
          required: ["Sancor Salud"],
        },
      },
      required: ["@context", "type", "credentialSubject"],
    },
    iss: {
      type: "string",
    },
  },
  required: ["iat", "sub", "vc", "iss"],
};

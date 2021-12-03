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
            Vivienda: {
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
                    livingPlaceStatus: {
                      type: "string",
                    },
                    livingPlaceType: {
                      type: "string",
                    },
                    locationType: {
                      type: "string",
                    },
                    district: {
                      type: "string",
                    },
                    livingPlaceGeneralConditions: {
                      type: "string",
                    },
                    livingPlaceGasNetwork: {
                      type: "string",
                    },
                    livingPlaceCarefe: {
                      type: "string",
                    },
                    livingPlaceWaterNetwork: {
                      type: "string",
                    },
                    livingPlaceWellPump: {
                      type: "string",
                    },
                    livingPlaceElectricityGrid: {
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
                    "livingPlaceStatus",
                    "givenName",
                    "familyName",
                  ],
                },
              },
              required: ["preview", "category", "data"],
            },
          },
          required: ["Vivienda"],
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
            "Semillas Vivienda": {
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
                    "Tipo de Tenencia": {
                      type: "string",
                    },
                    "Tipo de Vivienda": {
                      type: "string",
                    },
                    "Tipo de Barrio": {
                      type: "string",
                    },
                    "Distrito de Residencia": {
                      type: "string",
                    },
                    Barrio: {
                      type: "string",
                    },
                    "Condiciones grales": {
                      type: "string",
                    },
                    "Red de gas": {
                      type: "string",
                    },
                    Garrafa: {
                      type: "string",
                    },
                    "Red de Agua": {
                      type: "string",
                    },
                    "Pozo/Bomba": {
                      type: "string",
                    },
                    "Instalacion de luz": {
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
                    "Tipo de Tenencia",
                    "NOMBRE",
                    "APELLIDO",
                  ],
                },
              },
              required: ["preview", "category", "data"],
            },
          },
          required: ["Semillas Vivienda"],
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

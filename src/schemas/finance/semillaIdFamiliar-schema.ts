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
            "Identidad Familiar": {
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
                    dni: {
                      type: "string",
                    },
                    givenName: {
                      type: "string",
                    },
                    familyName: {
                      type: "string",
                    },
                    holderRelation: {
                      type: "string",
                    },
                    beneficiaryDni: {
                      type: "string",
                    },
                    beneficiaryGivenName: {
                      type: "string",
                    },
                    beneficiaryFamilyName: {
                      type: "string",
                    },
                    gender: {
                      type: "string",
                    },
                    birthDate: {
                      type: "string",
                    },
                  },
                  required: [
                    "credentialName",
                    "dni",
                    "givenName",
                    "familyName",
                    "holderRelation",
                    "beneficiaryDni",
                    "beneficiaryGivenName",
                    "beneficiaryFamilyName",
                    "birthDate",
                  ],
                },
              },
              required: ["preview", "category", "data"],
            },
          },
          required: ["Identidad Familiar"],
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

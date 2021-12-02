export const v1 = {
  type: "object",
  properties: {
    iat: {
      type: "integer",
    },
    callback: {
      type: "string",
    },
    type: {
      type: "string",
    },
    claims: {
      type: "object",
      properties: {
        verifiable: {
          type: "object",
          properties: {
            emailMain: {
              type: "object",
              properties: {
                iss: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      did: {
                        type: "string",
                      },
                      url: {
                        type: "string",
                      },
                    },
                    required: ["did", "url"],
                  },
                },
                reason: {
                  type: "string",
                },
              },
              required: ["iss", "reason"],
            },
          },
          required: ["emailMain"],
        },
        nationalId: {
          type: "object",
          properties: {
            essential: {
              type: "boolean",
            },
            iss: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  did: {
                    type: "string",
                  },
                  url: {
                    type: "string",
                  },
                },
                required: ["did", "url"],
              },
            },
            reason: {
              type: "string",
            },
          },
          required: ["essential", "iss", "reason"],
        },
      },
      required: ["verifiable"],
    },
    aud: {
      type: "string",
    },
    iss: {
      type: "string",
    },
  },
  required: ["iat", "callback", "type", "claims", "aud", "iss"],
};

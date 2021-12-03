import { getTypes } from "../../credentialList";

const listCredentials = getTypes().reduce((_acc: any, valor: string) => {
  _acc[`${valor}`] = {
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
        },
      },
      reason: {
        type: "string",
      },
    },
  };
  return _acc;
}, {});

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
          properties: listCredentials,
          required: [],
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

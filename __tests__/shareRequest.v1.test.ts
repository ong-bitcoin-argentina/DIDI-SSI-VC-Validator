const { createSemicolonClassElement } = require("typescript");

const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
const { validateCredential } = require("../src/validator");
import { shareRequestSchema } from "../src/schemas/shareRequest";

const valid = {
  iat: 1638460373,
  callback: "callback",
  type: "shareReq",
  claims: {
    verifiable: {
      emailMain: {
        iss: [
          {
            did: "did:web:uport.claims",
            url: "https://uport.claims/email",
          },
          {
            did: "did:web:sobol.io",
            url: "https://sobol.io/verify",
          },
        ],
        reason: "Whe need to be able to email you",
      },
      nationalId: {
        essential: true,
        iss: [
          {
            did: "did:web:idverifier.claims",
            url: "https://idverifier.example",
          },
        ],
        reason: "To legally be able to open your account",
      },
    },
  },
  aud: "0x18a208fdf867348db23e3bde3d1e3ab4cf60f9e9",
  iss: "did:ethr:rsk:0x486aba684988ffbb681832273b4ba55e65b96883",
};

const validJWT = jwt.sign(valid, "sharedResquestKey");

test("Validate ok", async () => {
  const result = await validateCredential(shareRequestSchema.v1, validJWT);
  console.log(result);
  expect(result.status).toBe(true);
  expect(result.errors).toBe(null);
});

//INVALID SUB
const invalidIss = {
  iat: 1638460373,
  callback: "callback",
  type: "shareReq",
  claims: {
    verifiable: {
      emailMain: {
        iss: [
          {
            did: "did:web:uport.claims",
            url: "https://uport.claims/email",
          },
          {
            did: "did:web:sobol.io",
            url: "https://sobol.io/verify",
          },
        ],
        reason: "Whe need to be able to email you",
      },
      nationalId: {
        essential: true,
        iss: [
          {
            did: "did:web:idverifier.claims",
            url: "https://idverifier.example",
          },
        ],
        reason: "To legally be able to open your account",
      },
    },
  },
  aud: "0x18a208fdf867348db23e3bde3d1e3ab4cf60f9e9",
  iss: 5,
};

const invalidIssJWT = jwt.sign(invalidIss, "shareRequestKey");

test("Validate iss field FAIL", async () => {
  const result = await validateCredential(shareRequestSchema.v1, invalidIssJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(".iss");
  expect(result.errors[0].schemaPath).toBe("#/properties/iss/type");
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

//INVALID AUD
const invalidAud = {
  iat: 1638460373,
  callback: "callback",
  type: "shareReq",
  claims: {
    verifiable: {
      emailMain: {
        iss: [
          {
            did: "did:web:uport.claims",
            url: "https://uport.claims/email",
          },
          {
            did: "did:web:sobol.io",
            url: "https://sobol.io/verify",
          },
        ],
        reason: "Whe need to be able to email you",
      },
      nationalId: {
        essential: true,
        iss: [
          {
            did: "did:web:idverifier.claims",
            url: "https://idverifier.example",
          },
        ],
        reason: "To legally be able to open your account",
      },
    },
  },
  aud: 9,
  iss: "did:ethr:rsk:0x486aba684988ffbb681832273b4ba55e65b96883",
};

const invalidAudJWT = jwt.sign(invalidAud, "shareRequestKey");

test("Validate Aud field FAIL", async () => {
  const result = await validateCredential(shareRequestSchema.v1, invalidAudJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(".aud");
  expect(result.errors[0].schemaPath).toBe("#/properties/aud/type");
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

//INVALID TYPE TYPE
const invalidType = {
  iat: 1638460373,
  callback: "callback",
  type: 3,
  claims: {
    verifiable: {
      emailMain: {
        iss: [
          {
            did: "did:web:uport.claims",
            url: "https://uport.claims/email",
          },
          {
            did: "did:web:sobol.io",
            url: "https://sobol.io/verify",
          },
        ],
        reason: "Whe need to be able to email you",
      },
      nationalId: {
        essential: true,
        iss: [
          {
            did: "did:web:idverifier.claims",
            url: "https://idverifier.example",
          },
        ],
        reason: "To legally be able to open your account",
      },
    },
  },
  aud: "0x18a208fdf867348db23e3bde3d1e3ab4cf60f9e9",
  iss: "did:ethr:rsk:0x486aba684988ffbb681832273b4ba55e65b96883",
};

const invalidTypeJWT = jwt.sign(invalidType, "shareRequestKey");

test("Validate type field FAIL", async () => {
  const result = await validateCredential(
    shareRequestSchema.v1,
    invalidTypeJWT
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(".type");
  expect(result.errors[0].schemaPath).toBe("#/properties/type/type");
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

//INVALID CALLBACK TYPE
const invalidCallback = {
  iat: 1638460373,
  callback: 7,
  type: "shareReq",
  claims: {
    verifiable: {
      emailMain: {
        iss: [
          {
            did: "did:web:uport.claims",
            url: "https://uport.claims/email",
          },
          {
            did: "did:web:sobol.io",
            url: "https://sobol.io/verify",
          },
        ],
        reason: "Whe need to be able to email you",
      },
      nationalId: {
        essential: true,
        iss: [
          {
            did: "did:web:idverifier.claims",
            url: "https://idverifier.example",
          },
        ],
        reason: "To legally be able to open your account",
      },
    },
  },
  aud: "0x18a208fdf867348db23e3bde3d1e3ab4cf60f9e9",
  iss: "did:ethr:rsk:0x486aba684988ffbb681832273b4ba55e65b96883",
};

const invalidCallbackJWT = jwt.sign(invalidCallback, "shareRequestKey");

test("Validate Callback field FAIL", async () => {
  const result = await validateCredential(
    shareRequestSchema.v1,
    invalidCallbackJWT
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(".callback");
  expect(result.errors[0].schemaPath).toBe("#/properties/callback/type");
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

//INVALID DID TYPE

const invalidDidType = {
  iat: 1638460373,
  callback: "callback",
  type: "shareReq",
  claims: {
    verifiable: {
      emailMain: {
        iss: [
          {
            did: 3,
            url: "https://uport.claims/email",
          },
          {
            did: "did:web:sobol.io",
            url: "https://sobol.io/verify",
          },
        ],
        reason: "Whe need to be able to email you",
      },
      nationalId: {
        essential: true,
        iss: [
          {
            did: "did:web:idverifier.claims",
            url: "https://idverifier.example",
          },
        ],
        reason: "To legally be able to open your account",
      },
    },
  },
  aud: "0x18a208fdf867348db23e3bde3d1e3ab4cf60f9e9",
  iss: "did:ethr:rsk:0x486aba684988ffbb681832273b4ba55e65b96883",
};

const invalidDidTypeJWT = jwt.sign(invalidDidType, "shareRequestKey");

test(`Validate .claims.verifiable.emailMain.iss.did.type field FAIL`, async () => {
  const result = await validateCredential(
    shareRequestSchema.v1,
    invalidDidTypeJWT
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(
    ".claims.verifiable.emailMain.iss[0].did"
  );
  expect(result.errors[0].schemaPath).toBe(
    "#/properties/claims/properties/verifiable/properties/emailMain/properties/iss/items/properties/did/type"
  );
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

//INVALID URL TYPE
const invalidUrlType = {
  iat: 1638460373,
  callback: "callback",
  type: "shareReq",
  claims: {
    verifiable: {
      emailMain: {
        iss: [
          {
            did: "did:web:uport.claims",
            url: 7,
          },
          {
            did: "did:web:sobol.io",
            url: "https://sobol.io/verify",
          },
        ],
        reason: "Whe need to be able to email you",
      },
      nationalId: {
        essential: true,
        iss: [
          {
            did: "did:web:idverifier.claims",
            url: "https://idverifier.example",
          },
        ],
        reason: "To legally be able to open your account",
      },
    },
  },
  aud: "0x18a208fdf867348db23e3bde3d1e3ab4cf60f9e9",
  iss: "did:ethr:rsk:0x486aba684988ffbb681832273b4ba55e65b96883",
};

const invalidUrlTypeJWT = jwt.sign(invalidUrlType, "shareRequestKey");

test(`Validate .claims.verifiable.emailMain.iss.url.type field FAIL`, async () => {
  const result = await validateCredential(
    shareRequestSchema.v1,
    invalidUrlTypeJWT
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(
    ".claims.verifiable.emailMain.iss[0].url"
  );
  expect(result.errors[0].schemaPath).toBe(
    "#/properties/claims/properties/verifiable/properties/emailMain/properties/iss/items/properties/url/type"
  );
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

//INVALID VERIFIABLE DATA TYPE
const invalidVerifiableDataType = {
  iat: 1638460373,
  callback: "callback",
  type: "shareReq",
  claims: {
    verifiable: {
      emailMain: {
        iss: [
          {
            did: "did:web:uport.claims",
            url: "https://uport.claims/email",
          },
          {
            did: "did:web:sobol.io",
            url: "https://sobol.io/verify",
          },
        ],
        reason: 7,
      },
      nationalId: {
        essential: true,
        iss: [
          {
            did: "did:web:idverifier.claims",
            url: "https://idverifier.example",
          },
        ],
        reason: "To legally be able to open your account",
      },
    },
  },
  aud: "0x18a208fdf867348db23e3bde3d1e3ab4cf60f9e9",
  iss: "did:ethr:rsk:0x486aba684988ffbb681832273b4ba55e65b96883",
};

const invalidVerifiableDataTypeJWT = jwt.sign(
  invalidVerifiableDataType,
  "shareRequestKey"
);

test(`Validate .claims.verifiable.emailMain.reason.type field FAIL`, async () => {
  const result = await validateCredential(
    shareRequestSchema.v1,
    invalidVerifiableDataTypeJWT
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(".claims.verifiable.emailMain.reason");
  expect(result.errors[0].schemaPath).toBe(
    "#/properties/claims/properties/verifiable/properties/emailMain/properties/reason/type"
  );
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

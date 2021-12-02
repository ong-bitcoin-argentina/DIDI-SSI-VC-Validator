const { createSemicolonClassElement } = require("typescript");

const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
const { validateCredential } = require("../src/validator");
import { semillaSembTitular } from "../src/schemas/benefit";

const valid = {
  iat: 1615852878,
  sub: "did:ethr:0xb32a221acb553e48d8999a98de9af5f2786e13e4",
  vc: {
    "@context": ["https://www.w3.org/2018/credentials/v2"],
    type: ["VerifiableCredential"],
    credentialSubject: {
      "Sembrando - Titular": {
        category: "benefit",
        preview: {
          type: 1,
          fields: ["benefitHolderType", "dni"],
          cardLayout: null,
        },
        data: {
          credentialName: "Sembrando - Titular",
          dni: "51429570",
          benefitHolderType: "FAMILIAR",
          givenName: "Sergio Adrian",
          familyName: "Cabezas Alcalde",
        },
      },
    },
  },
  iss: "did:ethr:0xf31848d20f206f6d7f330a9c2e1c17c436815af3",
};

const validJWT = jwt.sign(valid, "semillaSembTitularKey");

test("Validate ok", async () => {
  const result = await validateCredential(semillaSembTitular.v2, validJWT);
  expect(result.status).toBe(true);
  expect(result.errors).toBe(null);
});

//INVALID SUB

const invalidSub = {
  iat: 1615852878,
  sub: 3,
  vc: {
    "@context": ["https://www.w3.org/2018/credentials/v2"],
    type: ["VerifiableCredential"],
    credentialSubject: {
      "Sembrando - Titular": {
        category: "benefit",
        preview: {
          type: 1,
          fields: ["benefitHolderType", "dni"],
          cardLayout: null,
        },
        data: {
          credentialName: "Sembrando - Titular",
          dni: "51429570",
          benefitHolderType: "FAMILIAR",
          givenName: "Sergio Adrian",
          familyName: "Cabezas Alcalde",
        },
      },
    },
  },
  iss: "did:ethr:0xf31848d20f206f6d7f330a9c2e1c17c436815af3",
};

const InvalidSubJWT = jwt.sign(invalidSub, "semillaSembTitularKey");

test("Validate sub field FAIL", async () => {
  const result = await validateCredential(semillaSembTitular.v2, InvalidSubJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(".sub");
  expect(result.errors[0].schemaPath).toBe("#/properties/sub/type");
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

//INVALID ISS

const invalidIss = {
  iat: 1615852878,
  sub: "did:ethr:0xb32a221acb553e48d8999a98de9af5f2786e13e4",
  vc: {
    "@context": ["https://www.w3.org/2018/credentials/v2"],
    type: ["VerifiableCredential"],
    credentialSubject: {
      "Sembrando - Titular": {
        category: "benefit",
        preview: {
          type: 1,
          fields: ["benefitHolderType", "dni"],
          cardLayout: null,
        },
        data: {
          credentialName: "Sembrando - Titular",
          dni: "51429570",
          benefitHolderType: "FAMILIAR",
          givenName: "Sergio Adrian",
          familyName: "Cabezas Alcalde",
        },
      },
    },
  },
  iss: 3,
};

const InvalidIssJWT = jwt.sign(invalidIss, "semillaSembTitularKey");

test("Validate iss field FAIL", async () => {
  const result = await validateCredential(semillaSembTitular.v2, InvalidIssJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(".iss");
  expect(result.errors[0].schemaPath).toBe("#/properties/iss/type");
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

//INVALID PREVIEW TYPE
const invalidPreviewType = {
  iat: 1615852878,
  sub: "did:ethr:0xb32a221acb553e48d8999a98de9af5f2786e13e4",
  vc: {
    "@context": ["https://www.w3.org/2018/credentials/v2"],
    type: ["VerifiableCredential"],
    credentialSubject: {
      "Sembrando - Titular": {
        category: "benefit",
        preview: {
          type: "1",
          fields: ["benefitHolderType", "dni"],
          cardLayout: null,
        },
        data: {
          credentialName: "Sembrando - Titular",
          dni: "51429570",
          benefitHolderType: "FAMILIAR",
          givenName: "Sergio Adrian",
          familyName: "Cabezas Alcalde",
        },
      },
    },
  },
  iss: "did:ethr:0xf31848d20f206f6d7f330a9c2e1c17c436815af3",
};

const invalidPreviewJWT = jwt.sign(invalidPreviewType, "semillaSembTitularKey");

test(`Validate .vc.credentialSubject['Sembrando - Titular'].preview.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaSembTitular.v2,
    invalidPreviewJWT
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Sembrando - Titular'].preview.type`
  );
  expect(result.errors[0].schemaPath).toBe(
    "#/properties/vc/properties/credentialSubject/properties/Sembrando%20-%20Titular/properties/preview/properties/type/type"
  );
  expect(result.errors[0].params.type).toBe("integer");
  expect(result.errors[0].message).toBe("should be integer");
});

//INVALID DATA TYPE

const invalidDataType = {
  iat: 1615852878,
  sub: "did:ethr:0xb32a221acb553e48d8999a98de9af5f2786e13e4",
  vc: {
    "@context": ["https://www.w3.org/2018/credentials/v2"],
    type: ["VerifiableCredential"],
    credentialSubject: {
      "Sembrando - Titular": {
        category: "benefit",
        preview: {
          type: 1,
          fields: ["benefitHolderType", "dni"],
          cardLayout: null,
        },
        data: {
          credentialName: 3,
          dni: "51429570",
          benefitHolderType: "FAMILIAR",
          givenName: "Sergio Adrian",
          familyName: "Cabezas Alcalde",
        },
      },
    },
  },
  iss: "did:ethr:0xf31848d20f206f6d7f330a9c2e1c17c436815af3",
};
const invalidDataTypeJWT = jwt.sign(invalidDataType, "semillaSembTitularKey");

test(`Validate .vc.credentialSubject['Sembrando - Titular'].data.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaSembTitular.v2,
    invalidDataTypeJWT
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Sembrando - Titular'].data.credentialName`
  );
  expect(result.errors[0].schemaPath).toBe(
    "#/properties/vc/properties/credentialSubject/properties/Sembrando%20-%20Titular/properties/data/properties/credentialName/type"
  );
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

//INVALID CATEGORY TYPE
const invalidCategory = {
  iat: 1615852878,
  sub: "did:ethr:0xb32a221acb553e48d8999a98de9af5f2786e13e4",
  vc: {
    "@context": ["https://www.w3.org/2018/credentials/v2"],
    type: ["VerifiableCredential"],
    credentialSubject: {
      "Sembrando - Titular": {
        category: 3,
        preview: {
          type: 1,
          fields: ["benefitHolderType", "dni"],
          cardLayout: null,
        },
        data: {
          credentialName: "Sembrando - Titular",
          dni: "51429570",
          benefitHolderType: "FAMILIAR",
          givenName: "Sergio Adrian",
          familyName: "Cabezas Alcalde",
        },
      },
    },
  },
  iss: "did:ethr:0xf31848d20f206f6d7f330a9c2e1c17c436815af3",
};

const invalidCategoryJWT = jwt.sign(invalidCategory, "semillaSembTitularKey");

test(`Validate .vc.credentialSubject['Sembrando - Titular'].category.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaSembTitular.v2,
    invalidCategoryJWT
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Sembrando - Titular'].category`
  );
  expect(result.errors[0].schemaPath).toBe(
    "#/properties/vc/properties/credentialSubject/properties/Sembrando%20-%20Titular/properties/category/type"
  );
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

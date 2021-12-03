const { createSemicolonClassElement } = require("typescript");

const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
const { validateCredential } = require("../src/validator");
import { semillaSancorSalud } from "../src/schemas/benefit";

const valid = {
  iat: 16,
  sub: "did:ethr:16",
  vc: {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    type: ["VerifiableCredential"],
    credentialSubject: {
      "Sancor Salud": {
        category: "benefit",
        preview: {
          type: 4,
          fields: ["REF", "POLIZA", "CERT", "NOMBRE", "APELLIDO", "DNI"],
          cardLayout: {
            rows: [
              {
                columns: 2,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
            ],
            backgroundImage:
              "https://issuer.api.alpha.didi.org.ar/img/CredencialSancor.png",
            style: "dark",
          },
        },
        data: {
          "CERTIFICADO O CURSO": "Sancor Salud",
          POLIZA: "numero",
          CERT: "certificado",
          REF: "numero",
          DNI: "numero de DNI",
          NOMBRE: "nombre",
          APELLIDO: "apellido",
        },
      },
    },
  },
  iss: "did:ethr:0x16",
};

const validJWT = jwt.sign(valid, "semillaSancorSaludKey");

test("Validate ok", async () => {
  const result = await validateCredential(semillaSancorSalud.v1, validJWT);
  console.log(result);
  expect(result.status).toBe(true);
  expect(result.errors).toBe(null);
});

//INVALID SUB
const invalidSub = {
  iat: 16,
  sub: 2,
  vc: {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    type: ["VerifiableCredential"],
    credentialSubject: {
      "Sancor Salud": {
        category: "benefit",
        preview: {
          type: 4,
          fields: ["REF", "POLIZA", "CERT", "NOMBRE", "APELLIDO", "DNI"],
          cardLayout: {
            rows: [
              {
                columns: 2,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
            ],
            backgroundImage:
              "https://issuer.api.alpha.didi.org.ar/img/CredencialSancor.png",
            style: "dark",
          },
        },
        data: {
          "CERTIFICADO O CURSO": "Sancor Salud",
          POLIZA: "numero",
          CERT: "certificado",
          REF: "numero",
          DNI: "numero de DNI",
          NOMBRE: "nombre",
          APELLIDO: "apellido",
        },
      },
    },
  },
  iss: "did:ethr:0x16",
};

const invalidSubJWT = jwt.sign(invalidSub, "semillaSancorSaludKey");

test("Validate sub field FAIL", async () => {
  const result = await validateCredential(semillaSancorSalud.v1, invalidSubJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(".sub");
  expect(result.errors[0].schemaPath).toBe("#/properties/sub/type");
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

//INVALID ISS
const invalidIss = {
  iat: 16,
  sub: "did:ethr:16",
  vc: {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    type: ["VerifiableCredential"],
    credentialSubject: {
      "Sancor Salud": {
        category: "benefit",
        preview: {
          type: 4,
          fields: ["REF", "POLIZA", "CERT", "NOMBRE", "APELLIDO", "DNI"],
          cardLayout: {
            rows: [
              {
                columns: 2,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
            ],
            backgroundImage:
              "https://issuer.api.alpha.didi.org.ar/img/CredencialSancor.png",
            style: "dark",
          },
        },
        data: {
          "CERTIFICADO O CURSO": "Sancor Salud",
          POLIZA: "numero",
          CERT: "certificado",
          REF: "numero",
          DNI: "numero de DNI",
          NOMBRE: "nombre",
          APELLIDO: "apellido",
        },
      },
    },
  },
  iss: 3,
};

const invalidIssJWT = jwt.sign(invalidIss, "semillaSancorSaludKey");

test("Validate iss field FAIL", async () => {
  const result = await validateCredential(semillaSancorSalud.v1, invalidIssJWT);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(".iss");
  expect(result.errors[0].schemaPath).toBe("#/properties/iss/type");
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

//INVALID PREVIEW TYPE
const invalidPreview = {
  iat: 16,
  sub: "did:ethr:16",
  vc: {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    type: ["VerifiableCredential"],
    credentialSubject: {
      "Sancor Salud": {
        category: "benefit",
        preview: {
          type: "4",
          fields: ["REF", "POLIZA", "CERT", "NOMBRE", "APELLIDO", "DNI"],
          cardLayout: {
            rows: [
              {
                columns: 2,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
            ],
            backgroundImage:
              "https://issuer.api.alpha.didi.org.ar/img/CredencialSancor.png",
            style: "dark",
          },
        },
        data: {
          "CERTIFICADO O CURSO": "Sancor Salud",
          POLIZA: "numero",
          CERT: "certificado",
          REF: "numero",
          DNI: "numero de DNI",
          NOMBRE: "nombre",
          APELLIDO: "apellido",
        },
      },
    },
  },
  iss: "did:ethr:0x16",
};

const invalidPreviewJWT = jwt.sign(invalidPreview, "semillaSancorSaludKey");

test(`Validate .vc.credentialSubject['Sancor Salud'].preview.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaSancorSalud.v1,
    invalidPreviewJWT
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Sancor Salud'].preview.type`
  );
  expect(result.errors[0].schemaPath).toBe(
    "#/properties/vc/properties/credentialSubject/properties/Sancor%20Salud/properties/preview/properties/type/type"
  );
  expect(result.errors[0].params.type).toBe("integer");
  expect(result.errors[0].message).toBe("should be integer");
});

//INVALID DATA TYPE
const invalidDataType = {
  iat: 16,
  sub: "did:ethr:16",
  vc: {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    type: ["VerifiableCredential"],
    credentialSubject: {
      "Sancor Salud": {
        category: "benefit",
        preview: {
          type: 4,
          fields: ["REF", "POLIZA", "CERT", "NOMBRE", "APELLIDO", "DNI"],
          cardLayout: {
            rows: [
              {
                columns: 2,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
            ],
            backgroundImage:
              "https://issuer.api.alpha.didi.org.ar/img/CredencialSancor.png",
            style: "dark",
          },
        },
        data: {
          "CERTIFICADO O CURSO": 5,
          POLIZA: "numero",
          CERT: "certificado",
          REF: "numero",
          DNI: "numero de DNI",
          NOMBRE: "nombre",
          APELLIDO: "apellido",
        },
      },
    },
  },
  iss: "did:ethr:0x16",
};

const invalidDataTypeJWT = jwt.sign(invalidDataType, "semillaSancorSaludKey");

test(`Validate .vc.credentialSubject['Sancor Salud'].data.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaSancorSalud.v1,
    invalidDataTypeJWT
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Sancor Salud'].data['CERTIFICADO O CURSO']`
  );
  expect(result.errors[0].schemaPath).toBe(
    "#/properties/vc/properties/credentialSubject/properties/Sancor%20Salud/properties/data/properties/CERTIFICADO%20O%20CURSO/type"
  );
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

//INVALID CATEGORY
const invalidCategory = {
  iat: 16,
  sub: "did:ethr:16",
  vc: {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    type: ["VerifiableCredential"],
    credentialSubject: {
      "Sancor Salud": {
        category: 3,
        preview: {
          type: 4,
          fields: ["REF", "POLIZA", "CERT", "NOMBRE", "APELLIDO", "DNI"],
          cardLayout: {
            rows: [
              {
                columns: 2,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
              {
                columns: 1,
              },
            ],
            backgroundImage:
              "https://issuer.api.alpha.didi.org.ar/img/CredencialSancor.png",
            style: "dark",
          },
        },
        data: {
          "CERTIFICADO O CURSO": "Sancor Salud",
          POLIZA: "numero",
          CERT: "certificado",
          REF: "numero",
          DNI: "numero de DNI",
          NOMBRE: "nombre",
          APELLIDO: "apellido",
        },
      },
    },
  },
  iss: "did:ethr:0x16",
};

const invalidCategoryJWT = jwt.sign(invalidCategory, "semillaSancorSaludKey");

test(`Validate .vc.credentialSubject['Sancor Salud'].category.type field FAIL`, async () => {
  const result = await validateCredential(
    semillaSancorSalud.v1,
    invalidCategoryJWT
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe("type");
  expect(result.errors[0].dataPath).toBe(
    `.vc.credentialSubject['Sancor Salud'].category`
  );
  expect(result.errors[0].schemaPath).toBe(
    "#/properties/vc/properties/credentialSubject/properties/Sancor%20Salud/properties/category/type"
  );
  expect(result.errors[0].params.type).toBe("string");
  expect(result.errors[0].message).toBe("should be string");
});

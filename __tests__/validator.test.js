const { validateCredential } = require('../src/validator');

const schema = {
    type: "object",
    properties: {
      foo: {type: "integer"},
      bar: {type: "string"}
    },
    required: ["foo"],
    additionalProperties: false
  }

const phoneSchema = {
    type: "object",
    iat: {type: "int32"}, //1630445692,
    sub: {type: "string"}, //"did:ethr:0x84b2f1c343176d264a18e9df0ffda8034d777fb6",
    vc: {
        type: "object",
        // "@context": [
        //     "https://www.w3.org/2018/credentials/v1"
        // ],
        type: { elements: { type: "string" } }, //["VerifiableCredential"],
        credentialSubject: {
            type: "object",
            Phone: {
                type: "object",
                preview: {
                    type: {type: "int32"}, //0,
                    fields: { elements: { type: "string" } },//[ "phoneNumber" ]
                },
                category: {type: "string"},//"identity",
                data: {
                    phoneNumber: {type: "int32"}, //"+542494603286"
                }
            }
        }
    },
    iss: {type: "string"} //"did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}
  
const phoneData = {
    iat: 1630445692,
    sub: "did:ethr:0x84b2f1c343176d264a18e9df0ffda8034d777fb6",
    vc: {
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      type: [
        "VerifiableCredential"
      ],
      credentialSubject: {
        Phone: {
          preview: {
            type: 0,
            fields: [
              "phoneNumber"
            ]
          },
          category: "identity",
          data: {
            "phoneNumber": "+542494603286"
          }
        }
      }
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

test('Validate', async () => {
    result = await validateCredential(phoneSchema, phoneData);
    expect(result).toBe(true);
});
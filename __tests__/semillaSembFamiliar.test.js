const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const {validateCredential} = require('../src/validator');
const semillaSembFamiliarSchema = require('../src/schema/semilla/semillaSembFamiliar-Schema-v1');

const validJDK = { 
    iat: 123456,
    sub: "1232123",
    vc: {
        context:"https://www.w3.org/2018/credentials/v1" ,
        type: "VerifiableCredential",
    },
    credentialSubjetct: {
        "Sembrado Familiar" :{
            data:{
                credentialName:"Test credential Name",
                beneficiaryDNI:"Test beneficiary DNI",
                benefitHolderType:"Test benefit Holder Type",
                givenName:"Test given name",
                familyName:"Test family name"
             },
            category: "benefit",
            preview: {
                type: 1,
                fields: ["credentialNumber", "beneficiaryDNI", "benefitHolderType", "givenName", "familyName"]
            }
        },
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const token = jwt.sign(validJDK, "semillaSembFamiliarKey");

test('Validate ok', async () => {
    const result = await validateCredential(semillaSembFamiliarSchema, token);
    expect(result.status).toBe(true);
    expect(result.errors).toBe(null);
});



const { createSemicolonClassElement } = require('typescript');

const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const {validateCredential} = require('../src/validator');
import { semillaIdFamiliar } from "../src/schemas/finance";

const valid = { 
    iat: 123456,
    sub: "1232123",
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
            "Identidad Familiar" :{
                data:{
                    credentialName: "CertificadoTest",
                    dni: "123456789",
                    givenName: "Luis Alberto",
                    familyName: "Garcia",
                    holderRelation: "Hermano",
                    beneficiaryDni: "45678912",
                    beneficiaryGivenName: "Marcos",
                    beneficiaryFamilyName: "Garcia",
                    gender: "F",
                    birthDate: "12/12/12"
                },
                category: "finance",
                preview: {
                    type: 1,
                    fields: ["credentialName", "dni", "givenName", "familyName", "holderRelation", "beneficiaryDni", "beneficiaryGivenName", "beneficiaryFamilyName", "gender", "birthDate"]
                }
            },
        },
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const validJWT = jwt.sign(valid, "semillaIdFamiliarKey");

test('Validate ok', async () => {
    const result = await validateCredential(semillaIdFamiliar.v1, validJWT);
    expect(result.status).toBe(true);
    expect(result.errors).toBe(null);
});

//INVALID SUB
const invalidSub = { 
    iat: 123456,
    sub: 1232123,
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
            "Identidad Familiar" :{
                data:{
                    credentialName: "CertificadoTest",
                    dni: "123456789",
                    givenName: "Luis Alberto",
                    familyName: "Garcia",
                    holderRelation: "Hermano",
                    beneficiaryDni: "45678912",
                    beneficiaryGivenName: "Marcos",
                    beneficiaryFamilyName: "Garcia",
                    gender: "F",
                    birthDate: "12/12/12"
                },
                category: "finance",
                preview: {
                    type: 1,
                    fields: ["credentialName", "dni", "givenName", "familyName", "holderRelation", "beneficiaryDni", "beneficiaryGivenName", "beneficiaryFamilyName", "gender", "birthDate"]
                }
            },
        },
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const invalidSubJWT = jwt.sign(invalidSub, "semillaIdFamiliarKey");

test('Validate sub field FAIL', async() => {
    const result = await validateCredential(semillaIdFamiliar.v1, invalidSubJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.sub');
    expect(result.errors[0].schemaPath).toBe('#/properties/sub/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });


  //INVALID ISS
  const invalidIss = { 
    iat: 123456,
    sub: "1232123",
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
            "Identidad Familiar" :{
                data:{
                    credentialName: "CertificadoTest",
                    dni: "123456789",
                    givenName: "Luis Alberto",
                    familyName: "Garcia",
                    holderRelation: "Hermano",
                    beneficiaryDni: "45678912",
                    beneficiaryGivenName: "Marcos",
                    beneficiaryFamilyName: "Garcia",
                    gender: "F",
                    birthDate: "12/12/12"
                },
                category: "finance",
                preview: {
                    type: 1,
                    fields: ["credentialName", "dni", "givenName", "familyName", "holderRelation", "beneficiaryDni", "beneficiaryGivenName", "beneficiaryFamilyName", "gender", "birthDate"]
                }
            },
        },
    },
    iss: 3333
}

const invalidIssJWT = jwt.sign(invalidIss, "semillaIdFamiliarKey");

test('Validate iss field FAIL', async () => {
    const result = await validateCredential(semillaIdFamiliar.v1, invalidIssJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.iss');
    expect(result.errors[0].schemaPath).toBe('#/properties/iss/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
});

//INVALID PREVIEW TYPE
const invalidPreviewType = { 
    iat: 123456,
    sub: "1232123",
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
            "Identidad Familiar" :{
                data:{
                    credentialName: "CertificadoTest",
                    dni: "123456789",
                    givenName: "Luis Alberto",
                    familyName: "Garcia",
                    holderRelation: "Hermano",
                    beneficiaryDni: "45678912",
                    beneficiaryGivenName: "Marcos",
                    beneficiaryFamilyName: "Garcia",
                    gender: "F",
                    birthDate: "12/12/12"
                },
                category: "finance",
                preview: {
                    type: "1",
                    fields: ["credentialName", "dni", "givenName", "familyName", "holderRelation", "beneficiaryDni", "beneficiaryGivenName", "beneficiaryFamilyName", "gender", "birthDate"]
                }
            },
        },
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const invalidPreviewTypeJWT = jwt.sign(invalidPreviewType, "semillaIdFamiliarKey");

test(`Validate .vc.credentialSubject['Identidad Familiar'].preview.type field FAIL`, async() =>{
    const result = await validateCredential(semillaIdFamiliar.v1, invalidPreviewTypeJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject['Identidad Familiar'].preview.type`);
    expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Identidad%20Familiar/properties/preview/properties/type/type');
    expect(result.errors[0].params.type).toBe('integer');
    expect(result.errors[0].message).toBe('should be integer');
  });


  //INVALID DATA TYPE
  const invalidDataType = { 
    iat: 123456,
    sub: "1232123",
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
            "Identidad Familiar" :{
                data:{
                    credentialName: 123,
                    dni: "123456789",
                    givenName: "Luis Alberto",
                    familyName: "Garcia",
                    holderRelation: "Hermano",
                    beneficiaryDni: "45678912",
                    beneficiaryGivenName: "Marcos",
                    beneficiaryFamilyName: "Garcia",
                    gender: "F",
                    birthDate: "12/12/12"
                },
                category: "finance",
                preview: {
                    type: 1,
                    fields: ["credentialName", "dni", "givenName", "familyName", "holderRelation", "beneficiaryDni", "beneficiaryGivenName", "beneficiaryFamilyName", "gender", "birthDate"]
                }
            },
        },
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const invalidDataTypeJWT = jwt.sign(invalidDataType, "semillaIdFamiliarKey");

test(`Validate .vc.credentialSubject['Identidad Familiar'].data.type field FAIL`, async() =>{
    const result = await validateCredential(semillaIdFamiliar.v1, invalidDataTypeJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject['Identidad Familiar'].data.credentialName`);
    expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Identidad%20Familiar/properties/data/properties/credentialName/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  //INVALID CATEGORY

  const invalidCategory = { 
    iat: 123456,
    sub: "1232123",
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
            "Identidad Familiar" :{
                data:{
                    credentialName: "CertificadoTest",
                    dni: "123456789",
                    givenName: "Luis Alberto",
                    familyName: "Garcia",
                    holderRelation: "Hermano",
                    beneficiaryDni: "45678912",
                    beneficiaryGivenName: "Marcos",
                    beneficiaryFamilyName: "Garcia",
                    gender: "F",
                    birthDate: "12/12/12"
                },
                category: 3,
                preview: {
                    type: 1,
                    fields: ["credentialName", "dni", "givenName", "familyName", "holderRelation", "beneficiaryDni", "beneficiaryGivenName", "beneficiaryFamilyName", "gender", "birthDate"]
                }
            },
        },
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const invalidCategoryJWT = jwt.sign(invalidCategory, "semillaIdFamiliarKey");


  test(`Validate .vc.credentialSubject['Identidad Familiar'].category.type field FAIL`, async() =>{
    const result = await validateCredential(semillaIdFamiliar.v1, invalidCategoryJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject['Identidad Familiar'].category`);
    expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Identidad%20Familiar/properties/category/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });
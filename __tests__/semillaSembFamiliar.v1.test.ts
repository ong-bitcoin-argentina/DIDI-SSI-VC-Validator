const { createSemicolonClassElement } = require('typescript');

const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const {validateCredential} = require('../src/validator');
import { semillaSembFamiliar } from "../src/schemas/benefit";

const valid = { 
    iat: 123456,
    sub: "1232123",
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
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
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const validJWT = jwt.sign(valid, "semillaSembFamiliarKey");

test('Validate ok', async () => {
    const result = await validateCredential(semillaSembFamiliar.v1, validJWT);
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
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const InvalidSubJWT = jwt.sign(invalidSub, "semillaSembFamiliarKey");

test('Validate sub field FAIL', async() => {
    const result = await validateCredential(semillaSembFamiliar.v1, InvalidSubJWT);
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
    },
    iss: 7878
}

const InvalidIssJWT = jwt.sign(invalidIss, "semillaSembFamiliarKey");


test('Validate iss field FAIL', async () => {
    const result = await validateCredential(semillaSembFamiliar.v1, InvalidIssJWT);
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
                type: "1",
                fields: ["credentialNumber", "beneficiaryDNI", "benefitHolderType", "givenName", "familyName"]
            }
        },
        },
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const invalidPreviewJWT = jwt.sign(invalidPreviewType, "semillaSembFamiliarKey");


test(`Validate .vc.credentialSubject['Sembrado Familiar'].preview.type field FAIL`, async() =>{
    const result = await validateCredential(semillaSembFamiliar.v1, invalidPreviewJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject['Sembrado Familiar'].preview.type`);
    expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Sembrado%20Familiar/properties/preview/properties/type/type');
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
            "Sembrado Familiar" :{
                data:{
                credentialName:123456,
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
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const invalidDataTypeJWT = jwt.sign(invalidDataType, "semillaSembFamiliarKey");

test(`Validate .vc.credentialSubject['Sembrado Familiar'].data.type field FAIL`, async() =>{
    const result = await validateCredential(semillaSembFamiliar.v1, invalidDataTypeJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject['Sembrado Familiar'].data.credentialName`);
    expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Sembrado%20Familiar/properties/data/properties/credentialName/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

//INVALID CATEGORY TYPE
const invalidCategory = { 
    iat: 123456,
    sub: "1232123",
    vc: {
        "@context":["https://www.w3.org/2018/credentials/v1" ],
        type: ["VerifiableCredential"],
        credentialSubject: {
            "Sembrado Familiar" :{
                data:{
                credentialName:"Test credential Name",
                beneficiaryDNI:"Test beneficiary DNI",
                benefitHolderType:"Test benefit Holder Type",
                givenName:"Test given name",
                familyName:"Test family name"
             },
            category: 1,
            preview: {
                type: 1,
                fields: ["credentialNumber", "beneficiaryDNI", "benefitHolderType", "givenName", "familyName"]
            }
        },
        },
    },
    iss: "did:ethr:0x2b184203babefe306901a76b053bc38659e4a795"
}

const invalidCategoryJWT = jwt.sign(invalidCategory, "semillaSembFamiliarKey");

test(`Validate .vc.credentialSubject['Sembrado Familiar'].category.type field FAIL`, async() =>{
    const result = await validateCredential(semillaSembFamiliar.v1, invalidCategoryJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject['Sembrado Familiar'].category`);
    expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Sembrado%20Familiar/properties/category/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });
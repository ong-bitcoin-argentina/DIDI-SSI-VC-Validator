const { createSemicolonClassElement } = require('typescript');

const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const {validateCredential} = require('../src/validator');
import { semillacrediticia } from "../src/schemas/finance";

const valid = { 
    iat: 123456,
    "sub": "did:ethr:0x695e6b81c58f03054582053dfecbc695e60bab79",
    "vc": {
        "@context": [
            "https://www.w3.org/2018/credentials/v2"
        ],
        "type": [
            "VerifiableCredential"
        ],
        "credentialSubject": {
            "Semillas Crediticia": {
            "category": "finance",
            "preview": {
                "type": 2,
                "fields": [
                "Tipo de Credito",
                "Estado de Credito",
                "Saldo Vencido",
                "Cuotas Totales"
                ],
                "cardLayout": null
            },
            "data": {
                "credentialName": "Semillas Crediticia",
                "dni": "94611549",
                "creditId": "BSDPEFKS",
                "creditType": "FONCAP ",
                "creditGroupID": "55-BSDPEFKZ",
                "creditCycle": "FONCAP Ciclo 2",
                "creditStatus": "Al dia",
                "creditTotalAmount": "55000.00",
                "creditBalanceDue": "0.00",
                "creditCurrentInstallment": "0",
                "creditTotalInstallments": "4",
                "creditDatePaymentDue": "2021-09-16",
                "creditStartDate": "2021-08-19",
                "givenName": "LORGIO",
                "familyName": "GUZMAN SOLARES"
            }
            }
        }
    },
    "iss": "did:ethr:0xf31848d20f206f6d7f330a9c2e1c17c436815af3"
}

const validJWT = jwt.sign(valid, "semillaCrediticiaKey");

test('Validate ok', async () => {
    const result = await validateCredential(semillacrediticia.v2, validJWT);
    expect(result.status).toBe(true);
    expect(result.errors).toBe(null);
});

//INVALID SUB
const invalidSub = { 
    iat: 123456,
    "sub": 26,
    "vc": {
        "@context": [
            "https://www.w3.org/2018/credentials/v2"
        ],
        "type": [
            "VerifiableCredential"
        ],
        "credentialSubject": {
            "Semillas Crediticia": {
            "category": "finance",
            "preview": {
                "type": 2,
                "fields": [
                "Tipo de Credito",
                "Estado de Credito",
                "Saldo Vencido",
                "Cuotas Totales"
                ],
                "cardLayout": null
            },
            "data": {
                "credentialName": "Semillas Crediticia",
                "dni": "94611549",
                "creditId": "BSDPEFKS",
                "creditType": "FONCAP ",
                "creditGroupID": "55-BSDPEFKZ",
                "creditCycle": "FONCAP Ciclo 2",
                "creditStatus": "Al dia",
                "creditTotalAmount": "55000.00",
                "creditBalanceDue": "0.00",
                "creditCurrentInstallment": "0",
                "creditTotalInstallments": "4",
                "creditDatePaymentDue": "2021-09-16",
                "creditStartDate": "2021-08-19",
                "givenName": "LORGIO",
                "familyName": "GUZMAN SOLARES"
            }
            }
        }
    },
    "iss": "did:ethr:0xf31848d20f206f6d7f330a9c2e1c17c436815af3"
}

const invalidSubJWT = jwt.sign(invalidSub, "semillaCrediticiaKey");

test('Validate sub field FAIL', async() => {
    const result = await validateCredential(semillacrediticia.v2, invalidSubJWT);
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
    "sub": "did:ethr:0x695e6b81c58f03054582053dfecbc695e60bab79",
    "vc": {
        "@context": [
            "https://www.w3.org/2018/credentials/v2"
        ],
        "type": [
            "VerifiableCredential"
        ],
        "credentialSubject": {
            "Semillas Crediticia": {
            "category": "finance",
            "preview": {
                "type": 2,
                "fields": [
                "Tipo de Credito",
                "Estado de Credito",
                "Saldo Vencido",
                "Cuotas Totales"
                ],
                "cardLayout": null
            },
            "data": {
                "credentialName": "Semillas Crediticia",
                "dni": "94611549",
                "creditId": "BSDPEFKS",
                "creditType": "FONCAP ",
                "creditGroupID": "55-BSDPEFKZ",
                "creditCycle": "FONCAP Ciclo 2",
                "creditStatus": "Al dia",
                "creditTotalAmount": "55000.00",
                "creditBalanceDue": "0.00",
                "creditCurrentInstallment": "0",
                "creditTotalInstallments": "4",
                "creditDatePaymentDue": "2021-09-16",
                "creditStartDate": "2021-08-19",
                "givenName": "LORGIO",
                "familyName": "GUZMAN SOLARES"
            }
            }
        }
    },
    "iss": 44
}

const invalidIssJWT = jwt.sign(invalidIss, "semillaCrediticiaKey");

test('Validate iss field FAIL', async () => {
    const result = await validateCredential(semillacrediticia.v2, invalidIssJWT);
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
    "sub": "did:ethr:0x695e6b81c58f03054582053dfecbc695e60bab79",
    "vc": {
        "@context": [
            "https://www.w3.org/2018/credentials/v2"
        ],
        "type": [
            "VerifiableCredential"
        ],
        "credentialSubject": {
            "Semillas Crediticia": {
            "category": "finance",
            "preview": {
                "type": "2",
                "fields": [
                "Tipo de Credito",
                "Estado de Credito",
                "Saldo Vencido",
                "Cuotas Totales"
                ],
                "cardLayout": null
            },
            "data": {
                "credentialName": "Semillas Crediticia",
                "dni": "94611549",
                "creditId": "BSDPEFKS",
                "creditType": "FONCAP ",
                "creditGroupID": "55-BSDPEFKZ",
                "creditCycle": "FONCAP Ciclo 2",
                "creditStatus": "Al dia",
                "creditTotalAmount": "55000.00",
                "creditBalanceDue": "0.00",
                "creditCurrentInstallment": "0",
                "creditTotalInstallments": "4",
                "creditDatePaymentDue": "2021-09-16",
                "creditStartDate": "2021-08-19",
                "givenName": "LORGIO",
                "familyName": "GUZMAN SOLARES"
            }
            }
        }
    },
    "iss": "did:ethr:0xf31848d20f206f6d7f330a9c2e1c17c436815af3"
}

const invalidPreviewTypeJWT = jwt.sign(invalidPreviewType, "semillaCrediticiaKey");

test(`Validate .vc.credentialSubject['Semillas Crediticia'].preview.type field FAIL`, async() =>{
    const result = await validateCredential(semillacrediticia.v2, invalidPreviewTypeJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject['Semillas Crediticia'].preview.type`);
    expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Semillas%20Crediticia/properties/preview/properties/type/type');
    expect(result.errors[0].params.type).toBe('integer');
    expect(result.errors[0].message).toBe('should be integer');
  });

//INVALID DATA TYPE
const invalidDataType = { 
    iat: 123456,
    "sub": "did:ethr:0x695e6b81c58f03054582053dfecbc695e60bab79",
    "vc": {
        "@context": [
            "https://www.w3.org/2018/credentials/v2"
        ],
        "type": [
            "VerifiableCredential"
        ],
        "credentialSubject": {
            "Semillas Crediticia": {
            "category": "finance",
            "preview": {
                "type": 2,
                "fields": [
                "Tipo de Credito",
                "Estado de Credito",
                "Saldo Vencido",
                "Cuotas Totales"
                ],
                "cardLayout": null
            },
            "data": {
                "credentialName": 23,
                "dni": "94611549",
                "creditId": "BSDPEFKS",
                "creditType": "FONCAP ",
                "creditGroupID": "55-BSDPEFKZ",
                "creditCycle": "FONCAP Ciclo 2",
                "creditStatus": "Al dia",
                "creditTotalAmount": "55000.00",
                "creditBalanceDue": "0.00",
                "creditCurrentInstallment": "0",
                "creditTotalInstallments": "4",
                "creditDatePaymentDue": "2021-09-16",
                "creditStartDate": "2021-08-19",
                "givenName": "LORGIO",
                "familyName": "GUZMAN SOLARES"
            }
            }
        }
    },
    "iss": "did:ethr:0xf31848d20f206f6d7f330a9c2e1c17c436815af3"
}

const invalidDataTypeJWT = jwt.sign(invalidDataType, "semillaCrediticiaKey");

test(`Validate .vc.credentialSubject['Semillas Crediticia'].data.type field FAIL`, async() =>{
    const result = await validateCredential(semillacrediticia.v2, invalidDataTypeJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject['Semillas Crediticia'].data.credentialName`);
    expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Semillas%20Crediticia/properties/data/properties/credentialName/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

//INVALID CATEGORY
const invalidCategory = { 
    iat: 123456,
    "sub": "did:ethr:0x695e6b81c58f03054582053dfecbc695e60bab79",
    "vc": {
        "@context": [
            "https://www.w3.org/2018/credentials/v2"
        ],
        "type": [
            "VerifiableCredential"
        ],
        "credentialSubject": {
            "Semillas Crediticia": {
            "category": 23,
            "preview": {
                "type": 2,
                "fields": [
                "Tipo de Credito",
                "Estado de Credito",
                "Saldo Vencido",
                "Cuotas Totales"
                ],
                "cardLayout": null
            },
            "data": {
                "credentialName": "Semillas Crediticia",
                "dni": "94611549",
                "creditId": "BSDPEFKS",
                "creditType": "FONCAP ",
                "creditGroupID": "55-BSDPEFKZ",
                "creditCycle": "FONCAP Ciclo 2",
                "creditStatus": "Al dia",
                "creditTotalAmount": "55000.00",
                "creditBalanceDue": "0.00",
                "creditCurrentInstallment": "0",
                "creditTotalInstallments": "4",
                "creditDatePaymentDue": "2021-09-16",
                "creditStartDate": "2021-08-19",
                "givenName": "LORGIO",
                "familyName": "GUZMAN SOLARES"
            }
            }
        }
    },
    "iss": "did:ethr:0xf31848d20f206f6d7f330a9c2e1c17c436815af3"
}

const invalidCategoryJWT = jwt.sign(invalidCategory, "semillaCrediticiaKey");

test(`Validate .vc.credentialSubject['Semillas Crediticia'].category.type field FAIL`, async() =>{
    const result = await validateCredential(semillacrediticia.v2, invalidCategoryJWT);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject['Semillas Crediticia'].category`);
    expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Semillas%20Crediticia/properties/category/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });
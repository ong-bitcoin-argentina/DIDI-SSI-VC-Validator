module.exports = {
  semillaSembFamiliarSchema: {
      "type": "object",
      "properties": {
        "iat": {
          "type": "integer"
        },
        "sub": {
          "type": "string"
        },
        "vc": {
          "type": "object",
          "properties": {
            "@context": {
              "type": "array",
              "items": [
                {
                  "type": "string"
                }
              ]
            },
            "type": {
              "type": "array",
              "items": [
                {
                  "type": "string"
                }
              ]
            },
            "credentialSubject": {
              "type": "object",
              "properties": {
                "Sembrado Familiar": {
                  "type": "object",
                  "properties": {
                    "preview": {
                      "type": "object",
                      "properties": {
                        "type": {
                          "type": "integer"
                        },
                        "fields": {
                          "type": "array",
                          "items": [
                            {
                              "type": "string"
                            }
                          ]
                        }
                      },
                      "required": [
                        "type",
                        "fields"
                      ]
                    },
                    "category": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "credentialName": {
                          "type": "string"
                        },
                        "beneficiaryDNI": {
                          "type": "string"
                        },
                        "benefitHolderType": {
                          "type": "string"
                        },
                        "givenName": {
                          "type": "string"
                        },
                        "familyName": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "credentialName",
                        "beneficiaryDNI",
                        "givenName",
                        "familyName"
                      ]
                    }
                  },
                  "required": [
                    "preview",
                    "category",
                    "data"
                  ]
                }
              },
              "required": [
                "Sembrado Familiar"
              ]
            }
          },
          "required": [
            "@context",
            "type",
            "credentialSubject"
          ]
        },
        "iss": {
          "type": "string"
        }
      },
      "required": [
        "iat",
        "sub",
        "vc",
        "iss"
      ]
    }
}
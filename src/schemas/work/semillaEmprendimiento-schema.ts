export const v1 = {
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
              "Emprendimiento": {
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
                      "businessType": {
                        "type": "string"
                      },
                      "businessStartDate": {
                        "type": "string"
                      },
                      "mainOccupation": {
                        "type": "string"
                      },
                      "businessName": {
                        "type": "string"
                      },
                      "businessAddress": {
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
                        "businessType",
                        "businessStartDate",
                        "mainOccupation",
                        "businessName",
                        "businessAddress",
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
              "Emprendimiento"
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
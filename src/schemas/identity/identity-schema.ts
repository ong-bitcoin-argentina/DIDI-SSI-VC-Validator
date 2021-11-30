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
                "Datos Personales": {
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
                        "dni": {
                          "type": "string"
                        },
                        "names": {
                          "type": "string"
                        },
                        "lastNames": {
                          "type": "string"
                        },
                        "nationality": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "dni",
                        "names",
                        "lastNames",
                        "nationality",
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
                "Datos Personales"
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
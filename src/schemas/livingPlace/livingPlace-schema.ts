export const v2 = {
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
              "Vivienda": {
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
                      "livingPlaceStatus": {
                        "type": "string"
                      },
                      "livingPlaceType": {
                        "type": "string"
                      },
                      "locationType": {
                        "type": "string"
                      },
                      "district": {
                        "type": "string"
                      },
                      "livingPlaceGeneralConditions": {
                        "type": "string"
                      },
                      "livingPlaceGasNetwork": {
                        "type": "string"
                      },
                      "livingPlaceCarefe": {
                        "type": "string"
                      },
                      "livingPlaceWaterNetwork": {
                        "type": "string"
                      },
                      "livingPlaceWellPump": {
                        "type": "string"
                      },
                      "livingPlaceElectricityGrid": {
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
                        "livingPlaceStatus",
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
              "Vivienda"
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
              "Vivienda": {
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
                      "livingPlaceStatus": {
                        "type": "string"
                      },
                      "livingPlaceType": {
                        "type": "string"
                      },
                      "locationType": {
                        "type": "string"
                      },
                      "district": {
                        "type": "string"
                      },
                      "neighborhood": {
                        "type": "string"
                      },
                      "livingPlaceGeneralConditions": {
                        "type": "string"
                      },
                      "livingPlaceGasNetwork": {
                        "type": "string"
                      },
                      "livingPlaceCarefe": {
                        "type": "string"
                      },
                      "livingPlaceWaterNetwork": {
                        "type": "string"
                      },
                      "livingPlaceWellPump": {
                        "type": "string"
                      },
                      "livingPlaceElectricityGrid": {
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
                        "livingPlaceStatus",
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
              "Vivienda"
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
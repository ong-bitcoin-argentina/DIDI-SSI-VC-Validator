export const v1 = {
  phoneSchema: {
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
              "Phone": {
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
                      "phoneNumber": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "phoneNumber"
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
              "Phone"
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
import Ajv from "ajv"
import jwt_decode from 'jwt-decode';

type ValidateCredentialType = {
  status: boolean;
  errors: any;
}

export function validateCredential(schema: object, jwt: string): ValidateCredentialType {
  const ajv = new Ajv()
  const validate = ajv.compile(schema)   
  let decoded = jwt_decode(jwt)
  let valid = validate(decoded)
  if (!valid) {
    return {
      status: false,
      errors: validate.errors
    }
  }
  return { 
    status: true,
    errors: null
  };
}
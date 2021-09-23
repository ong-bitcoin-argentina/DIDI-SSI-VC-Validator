import Ajv from "ajv"
import jwt_decode from 'jwt-decode';

export function validateCredential(schema: object, jwt: string): boolean {
  const ajv = new Ajv()
  const validate = ajv.compile(schema)   
  let decoded = jwt_decode(jwt)
  let valid = validate(decoded)
  if (!valid) {
    console.log(validate.errors)
    return false
  }
  return true;
}
import Ajv from "ajv"

export function validateCredential(schema: object, jwt: object): boolean {
  const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
      
  const validate = ajv.compile(schema)   
  
  let valid
  valid = validate(jwt)
  if (!valid) {
    console.log(validate.errors)
    return false
  }
  return true;
}
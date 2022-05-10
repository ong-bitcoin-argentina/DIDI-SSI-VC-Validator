/* eslint-disable camelcase */
import Ajv from 'ajv';
import jwt_decode from 'jwt-decode';

type ValidateCredentialType = {
  status: boolean;
  errors: any;
};

export function validateCredential(
  schema: object,
  jwt: string,
): ValidateCredentialType {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const decoded = jwt_decode(jwt);
  const valid = validate(decoded);
  if (!valid) {
    return {
      status: false,
      errors: validate.errors,
    };
  }
  return {
    status: true,
    errors: null,
  };
}

export function validateSchema(
  schema: object,
  body: object,
): ValidateCredentialType {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(body);
  if (!valid) {
    return {
      status: false,
      errors: validate.errors,
    };
  }
  return {
    status: true,
    errors: null,
  };
}

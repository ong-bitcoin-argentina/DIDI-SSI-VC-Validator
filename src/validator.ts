/* eslint-disable camelcase */
import Ajv from 'ajv';
import jwt_decode from 'jwt-decode';
import encode from 'jsonwebtoken';
import { getSchemaByName } from './credentialList';
import { shareRespSchema } from './messages';

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

export function validateMessageRes(jwt: string): ValidateCredentialType {
  let res;
  res = validateCredential(shareRespSchema.v1, jwt);
  const decoded: any = jwt_decode(jwt);
  const { vc } = decoded;
  if (res.status) {
    vc.forEach((value: any) => {
      const name = Object.keys(value.vc.credentialSubject);
      const vc_schema = getSchemaByName(name[0]);
      const vc_jwt = encode.sign(value, name[0]);
      res = validateCredential(vc_schema, vc_jwt);
    });
  }
  return res;
}

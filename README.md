# DIDI-SSI-VC-Validator

This library is intented to support credential validations and all its variations.
Each credential type is defined by a schema (path: src/schemas/*) in this library. As well as the messages (path: src/messages/*).
Below there is a description of how to implement it.

<hr style="border:1px solid gray"> </hr>

## Examples
**Validate a Schema**
```
/*Schema definition*/
const { v1: shareReqSchema } = require('@proyecto-didi/vc-validator/dist/messages/shareRequest-schema');
/*Schema validator*/
const { validateSchema } = require('@proyecto-didi/vc-validator/dist/validator');

validation = validateCredential(shareReqSchema, jwt);
/*status: true/false*/
if (!validation.status && validation.errors.length) {
  throw ERR.VALIDATION_ERROR(validation.errors.map((e) => e.message));
}
```

## [Library package](https://www.npmjs.com/package/@proyecto-didi/vc-validator)

For more information about DIDI project, see the [documentation](https://docs.didi.org.ar/docs/developers/solucion/descripcion-tecnica/arquitectura-issuer)
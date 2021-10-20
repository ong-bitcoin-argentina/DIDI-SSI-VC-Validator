const { validateCredential } = require('../src/validator');
const { identitySchema } = require('../src/schema/renaper/identity-schema-v1');

const validJwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTUzNDgzODIsInN1YiI6ImRpZDpldGhyOjB4MDY1MzI0ZmU3ZjhjNGE4ZmM5MjExODA2YjIwN2I4NWM3OTFkZDBkZCIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiRGF0b3MgUGVyc29uYWxlcyI6eyJwcmV2aWV3Ijp7ImZpZWxkcyI6WyJkbmkiLCJuYW1lcyIsImxhc3ROYW1lcyIsIm5hdGlvbmFsaXR5Il0sInR5cGUiOjJ9LCJjYXRlZ29yeSI6ImlkZW50aXR5IiwiZGF0YSI6eyJkbmkiOiIzMjkxOTkyMiIsIm5hbWVzIjoiVGFtYXJhIiwibGFzdE5hbWVzIjoiQkFHREFTU0FSSUFOIiwibmF0aW9uYWxpdHkiOiJBUkdFTlRJTkEifX19fSwiaXNzIjoiZGlkOmV0aHI6MHg1MTA5ZTM3MDE1YzkxNWNhMmZkNTg1YTQxMDVjZjU0ZWFiY2ExN2Y4In0.qFMJoLgUkPqSsmRdT6O7KxccKOR9eOpDjj8HMIkrUGrSBtLq9blzuWHI3FKtLuYgSS29CDi68sSKVeh1oI3BNwA';
const invalidIat = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIxNTk1MzQ2NTQ5Iiwic3ViIjoiZGlkOmV0aHI6MHgzYmM3OGZiZjJiMTQxOTVmODk3MWQ2YzI1NTEwOTNlNTJjODc5YjhiIiwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJEYXRvcyBQZXJzb25hbGVzIjp7InByZXZpZXciOnsiZmllbGRzIjpbImRuaSIsIm5hbWVzIiwibGFzdE5hbWVzIiwibmF0aW9uYWxpdHkiXSwidHlwZSI6Mn0sImNhdGVnb3J5IjoiaWRlbnRpdHkiLCJkYXRhIjp7ImRuaSI6IjMyOTE5OTIyIiwibmFtZXMiOiJUYW1hcmEiLCJsYXN0TmFtZXMiOiJCQUdEQVNTQVJJQU4iLCJuYXRpb25hbGl0eSI6IkFSR0VOVElOQSJ9fX19LCJpc3MiOiJkaWQ6ZXRocjoweDUxMDllMzcwMTVjOTE1Y2EyZmQ1ODVhNDEwNWNmNTRlYWJjYTE3ZjgifQ.ezIwPtZIiT8x2xUl5xinnxxxF0jJxf4IyvJn0jsf1xU';
const invalidSub = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTUzNDY1NDksInN1YiI6My43ODE0MTk1ODk3MTU1MTA3ZSsyMSwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJEYXRvcyBQZXJzb25hbGVzIjp7InByZXZpZXciOnsiZmllbGRzIjpbImRuaSIsIm5hbWVzIiwibGFzdE5hbWVzIiwibmF0aW9uYWxpdHkiXSwidHlwZSI6Mn0sImNhdGVnb3J5IjoiaWRlbnRpdHkiLCJkYXRhIjp7ImRuaSI6IjMyOTE5OTIyIiwibmFtZXMiOiJUYW1hcmEiLCJsYXN0TmFtZXMiOiJCQUdEQVNTQVJJQU4iLCJuYXRpb25hbGl0eSI6IkFSR0VOVElOQSJ9fX19LCJpc3MiOiJkaWQ6ZXRocjoweDUxMDllMzcwMTVjOTE1Y2EyZmQ1ODVhNDEwNWNmNTRlYWJjYTE3ZjgifQ.gBOf-ieykkSdmy_viIkkcO1t1Bud2QNBUuJ24GwqqY0';
const invalidPreviewField = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTUzNDY1NDksInN1YiI6ImRpZDpldGhyOjB4M2JjNzhmYmYyYjE0MTk1Zjg5NzFkNmMyNTUxMDkzZTUyYzg3OWI4YiIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiRGF0b3MgUGVyc29uYWxlcyI6eyJwcmV2aWV3Ijp7ImZpZWxkcyI6WyJkbmkiLCJuYW1lcyIsImxhc3ROYW1lcyIsIm5hdGlvbmFsaXR5Il0sInR5cGUiOiIyIn0sImNhdGVnb3J5IjoiaWRlbnRpdHkiLCJkYXRhIjp7ImRuaSI6IjMyOTE5OTIyIiwibmFtZXMiOiJUYW1hcmEiLCJsYXN0TmFtZXMiOiJCQUdEQVNTQVJJQU4iLCJuYXRpb25hbGl0eSI6IkFSR0VOVElOQSJ9fX19LCJpc3MiOiJkaWQ6ZXRocjoweDUxMDllMzcwMTVjOTE1Y2EyZmQ1ODVhNDEwNWNmNTRlYWJjYTE3ZjgifQ.ZI54axBcNU-llhRtw79Ah_wV--rGFkJ2me6-0a47K64';
const invalidDataField = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTUzNDY1NDksInN1YiI6ImRpZDpldGhyOjB4M2JjNzhmYmYyYjE0MTk1Zjg5NzFkNmMyNTUxMDkzZTUyYzg3OWI4YiIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiRGF0b3MgUGVyc29uYWxlcyI6eyJwcmV2aWV3Ijp7ImZpZWxkcyI6WyJkbmkiLCJuYW1lcyIsImxhc3ROYW1lcyIsIm5hdGlvbmFsaXR5Il0sInR5cGUiOjJ9LCJjYXRlZ29yeSI6ImlkZW50aXR5IiwiZGF0YSI6eyJkbmkiOjMzODI0NTY4OSwibmFtZXMiOiJUaXRvIiwibGFzdE5hbWVzIjoiUGVyZXoiLCJuYXRpb25hbGl0eSI6IkFSR0VOVElOQSJ9fX19LCJpc3MiOiJkaWQ6ZXRocjoweDUxMDllMzcwMTVjOTE1Y2EyZmQ1ODVhNDEwNWNmNTRlYWJjYTE3ZjgifQ.swSNrtHAE0qqxzaFfeKC89snfx09r16ItRWabCjjogY';
const invalidIss = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTUzNDY1NDksInN1YiI6ImRpZDpldGhyOjB4M2JjNzhmYmYyYjE0MTk1Zjg5NzFkNmMyNTUxMDkzZTUyYzg3OWI4YiIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiRGF0b3MgUGVyc29uYWxlcyI6eyJwcmV2aWV3Ijp7ImZpZWxkcyI6WyJkbmkiLCJuYW1lcyIsImxhc3ROYW1lcyIsIm5hdGlvbmFsaXR5Il0sInR5cGUiOjJ9LCJjYXRlZ29yeSI6ImlkZW50aXR5IiwiZGF0YSI6eyJkbmkiOiIzMjkxOTkyMiIsIm5hbWVzIjoiVGFtYXJhIiwibGFzdE5hbWVzIjoiQkFHREFTU0FSSUFOIiwibmF0aW9uYWxpdHkiOiJBUkdFTlRJTkEifX19fSwiaXNzIjo1LjEwOTM3MDE1MTU4NTQxZSsyMX0.9FMRf_PEdUHo3Akku7HvBUOPGnWzm2yLOjbe1nYpl6Y';

test('Validate ok', async () => {
  result = await validateCredential(identitySchema, validJwt);
  expect(result.status).toBe(true);
  expect(result.errors).toBe(null);
});

test('Validate iat field FAIL', async () => {
  result = await validateCredential(identitySchema, invalidIat);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.iat');
  expect(result.errors[0].schemaPath).toBe('#/properties/iat/type');
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].params.type).toBe('integer');
  expect(result.errors[0].message).toBe('should be integer');
});

test('Validate sub field FAIL', async() => {
  result = await validateCredential(identitySchema, invalidSub);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.sub');
  expect(result.errors[0].schemaPath).toBe('#/properties/sub/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

test(`Validate .vc.credentialSubject['Datos Personales'].preview.type field FAIL`, async() =>{
  result = await validateCredential(identitySchema, invalidPreviewField);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject['Datos Personales'].preview.type`);
  expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Datos%20Personales/properties/preview/properties/type/type');
  expect(result.errors[0].params.type).toBe('integer');
  expect(result.errors[0].message).toBe('should be integer');
});

test(`Validate .vc.credentialSubject['Datos Personales'].data.type field FAIL`, async() =>{
  result = await validateCredential(identitySchema, invalidDataField);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(`.vc.credentialSubject['Datos Personales'].data.dni`);
  expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Datos%20Personales/properties/data/properties/dni/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

test('Validate sub field FAIL', async() => {
  result = await validateCredential(identitySchema, invalidIss);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.iss');
  expect(result.errors[0].schemaPath).toBe('#/properties/iss/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});
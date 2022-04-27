import { validateCredential } from '../src/validator';
import { legalAddress } from '../src/schemas/identity';

const validJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEyMzQ1Niwic3ViIjoiZGlkOmV0aHI6MHgwMDAiLCJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7IkRvbWljaWxpbyBMZWdhbCI6eyJwcmV2aWV3Ijp7ImZpZWxkcyI6WyJzdHJlZXRBZGRyZXNzIiwibnVtYmVyU3RyZWV0IiwiemlwQ29kZSIsImNpdHkiLCJwcm92aW5jZSIsImNvdW50cnkiXSwidHlwZSI6MX0sImNhdGVnb3J5IjoiaWRlbnRpdHkiLCJkYXRhIjp7InN0cmVldEFkZHJlc3MiOiJDYWxsZS9BdmVuaWRhIiwibnVtYmVyU3RyZWV0IjoiTnVtZXJvIGRlIGNhc2EiLCJmbG9vciI6IlBpc28iLCJkZXBhcnRtZW50IjoiRGVwYXJ0YW1lbnRvIiwiemlwQ29kZSI6IkNvZGlnbyBQb3N0YWwiLCJjaXR5IjoiQ2l1ZGFkIiwibXVuaWNpcGFsaXR5IjoiTXVuaWNpcGFsaWRhZCIsInByb3ZpbmNlIjoiUHJvdmluY2lhIiwiY291bnRyeSI6IlBhaXMifX19fSwiaXNzIjoiZGlkOmV0aHI6MHgwMDAifQ.sHg3yxZXn2wVUsDz2CRgghdY7bX9Gin6qjI1XpXrt3w';
const invalidSub =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTUzNDY1NDksInN1YiI6My4xNCwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJEb21pY2lsaW8gTGVnYWwiOnsicHJldmlldyI6eyJmaWVsZHMiOlsic3RyZWV0QWRkcmVzcyIsIm51bWJlclN0cmVldCIsInppcENvZGUiLCJjaXR5IiwicHJvdmluY2UiLCJjb3VudHJ5Il0sInR5cGUiOjF9LCJjYXRlZ29yeSI6ImlkZW50aXR5IiwiZGF0YSI6eyJzdHJlZXRBZGRyZXNzIjoiQ2FsbGUiLCJudW1iZXJTdHJlZXQiOiJOdW1lcm8iLCJmbG9vciI6IlBpc28iLCJkZXBhcnRtZW50IjoiRGVwYXJ0YW1lbnRvIiwiemlwQ29kZSI6IkNvZGlnbyBQb3N0YWwiLCJjaXR5IjoiQ2l1ZGFkIiwibXVuaWNpcGFsaXR5IjoiTXVuaWNpcGFsaWRhZCIsInByb3ZpbmNlIjoiUHJvdmluY2lhIiwiY291bnRyeSI6IkFyZ2VudGluYSJ9fX19LCJpc3MiOiJkaWQ6ZXRocjoweDAwMCJ9.5ONWNTEV6Qn-vnFwZdQ16NBhH9RXOR0uu2AgkBnQQnE';

describe('legalAddress.v1.test', () => {
  it('validate OK', async () => {
    expect.assertions(2);
    const result = await validateCredential(legalAddress.v1, validJwt);
    expect(result.status).toBe(true);
    expect(result.errors).toBeNull();
  });

  it('validate sub field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(legalAddress.v1, invalidSub);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.sub');
    expect(result.errors[0].schemaPath).toBe('#/properties/sub/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });
});

import { validateCredential } from '../src/validator';
import { legalAddress } from '../src/schemas/identity';

const validJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAzMTY0MTYsInN1YiI6ImRpZDpldGhyOjB4MDAwIiwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJEb21pY2lsaW8gTGVnYWwiOnsiY2F0ZWdvcnkiOiJpZGVudGl0eSIsInByZXZpZXciOnsidHlwZSI6MywiZmllbGRzIjpbIkNhbGxlIiwiTsO6bWVybyIsIkPDs2RpZ28gUG9zdGFsIiwiQ2l1ZGFkL0JhcnJpbyIsIlByb3ZpbmNpYSIsIlBhw61zIl0sImNhcmRMYXlvdXQiOm51bGx9LCJkYXRhIjp7IkNyZWRlbmNpYWwiOiJEb21pY2lsaW8gTGVnYWwiLCJEb21pY2lsaW8iOiJEb21pY2lsaW8iLCJDaXVkYWQvQmFycmlvIjoiQ2l1ZGFkIiwiRGVwYXJ0YW1lbnRvL011bmljaXBhbGlkYWQiOiJEZXBhcnRhbWVudG8iLCJQcm92aW5jaWEiOiJQcm92aW5jaWEiLCJQYcOtcyI6IlBhaXMifX19fSwiaXNzIjoiZGlkOmV0aHI6MHgwMDAifQ.mYsbj1Hmd6XSd4QtHPGTMtzrs9Jo7onflusIwKS-ijY';
const invalidDataField =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAzMTY0MTYsInN1YiI6ImRpZDpldGhyOjB4MDAwIiwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJEb21pY2lsaW8gTGVnYWwiOnsiY2F0ZWdvcnkiOiJpZGVudGl0eSIsInByZXZpZXciOnsidHlwZSI6MywiZmllbGRzIjpbIkNhbGxlIiwiTsO6bWVybyIsIkPDs2RpZ28gUG9zdGFsIiwiQ2l1ZGFkL0JhcnJpbyIsIlByb3ZpbmNpYSIsIlBhw61zIl0sImNhcmRMYXlvdXQiOm51bGx9LCJkYXRhIjp7IkNyZWRlbmNpYWwiOiJEb21pY2lsaW8gTGVnYWwiLCJEb21pY2lsaW8iOiJEb21pY2lsaW8iLCJDaXVkYWQvQmFycmlvIjoiQ2l1ZGFkIiwiRGVwYXJ0YW1lbnRvL011bmljaXBhbGlkYWQiOiJEZXBhcnRhbWVudG8iLCJQcm92aW5jaWEiOiJQcm92aW5jaWEiLCJQYcOtcyI6My4xNH19fX0sImlzcyI6ImRpZDpldGhyOjB4MDAwIn0.mFphZ9KtInXrP2xOtuBnFnMKz9XP8RZNrIFIzakWWCA';
const invalidIss =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAzMTY0MTYsInN1YiI6ImRpZDpldGhyOjB4MDAwIiwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJEb21pY2lsaW8gTGVnYWwiOnsiY2F0ZWdvcnkiOiJpZGVudGl0eSIsInByZXZpZXciOnsidHlwZSI6MywiZmllbGRzIjpbIkNhbGxlIiwiTsO6bWVybyIsIkPDs2RpZ28gUG9zdGFsIiwiQ2l1ZGFkL0JhcnJpbyIsIlByb3ZpbmNpYSIsIlBhw61zIl0sImNhcmRMYXlvdXQiOm51bGx9LCJkYXRhIjp7IkNyZWRlbmNpYWwiOiJEb21pY2lsaW8gTGVnYWwiLCJEb21pY2lsaW8iOiJEb21pY2lsaW8iLCJDaXVkYWQvQmFycmlvIjoiQ2l1ZGFkIiwiRGVwYXJ0YW1lbnRvL011bmljaXBhbGlkYWQiOiJEZXBhcnRhbWVudG8iLCJQcm92aW5jaWEiOiJQcm92aW5jaWEiLCJQYcOtcyI6IlBhaXMifX19fSwiaXNzIjozLjE0fQ.za_vs0JyNd36ByhcMsdeEUA7wmNHA2kD92r2TC5TYEE';
const invalidSub =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAzMTY0MTYsInN1YiI6My4xNCwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJEb21pY2lsaW8gTGVnYWwiOnsiY2F0ZWdvcnkiOiJpZGVudGl0eSIsInByZXZpZXciOnsidHlwZSI6MywiZmllbGRzIjpbIkNhbGxlIiwiTsO6bWVybyIsIkPDs2RpZ28gUG9zdGFsIiwiQ2l1ZGFkL0JhcnJpbyIsIlByb3ZpbmNpYSIsIlBhw61zIl0sImNhcmRMYXlvdXQiOm51bGx9LCJkYXRhIjp7IkNyZWRlbmNpYWwiOiJEb21pY2lsaW8gTGVnYWwiLCJEb21pY2lsaW8iOiJEb21pY2lsaW8iLCJDaXVkYWQvQmFycmlvIjoiQ2l1ZGFkIiwiRGVwYXJ0YW1lbnRvL011bmljaXBhbGlkYWQiOiJEZXBhcnRhbWVudG8iLCJQcm92aW5jaWEiOiJQcm92aW5jaWEiLCJQYcOtcyI6IlBhaXMifX19fSwiaXNzIjoiZGlkOmV0aHI6MHgwMDAifQ.Cp2IUYYpXWz0DtX4GEpUeCzVG8PtdL6gaLs3rdfAnSI';
const invalidPreviewField =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAzMTY0MTYsInN1YiI6ImRpZDpldGhyOjB4MDAwIiwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJEb21pY2lsaW8gTGVnYWwiOnsiY2F0ZWdvcnkiOiJpZGVudGl0eSIsInByZXZpZXciOnsidHlwZSI6IjMiLCJmaWVsZHMiOlsiQ2FsbGUiLCJOw7ptZXJvIiwiQ8OzZGlnbyBQb3N0YWwiLCJDaXVkYWQvQmFycmlvIiwiUHJvdmluY2lhIiwiUGHDrXMiXSwiY2FyZExheW91dCI6bnVsbH0sImRhdGEiOnsiQ3JlZGVuY2lhbCI6IkRvbWljaWxpbyBMZWdhbCIsIkRvbWljaWxpbyI6IkRvbWljaWxpbyIsIkNpdWRhZC9CYXJyaW8iOiJDaXVkYWQiLCJEZXBhcnRhbWVudG8vTXVuaWNpcGFsaWRhZCI6IkRlcGFydGFtZW50byIsIlByb3ZpbmNpYSI6IlByb3ZpbmNpYSIsIlBhw61zIjoiUGFpcyJ9fX19LCJpc3MiOiJkaWQ6ZXRocjoweDAwMCJ9.cLGQ_pJs90mrdA0TicNI07TDofgSndkp9b0710AmBMQ';

describe('legalAddress.v2.test', () => {
  it('validate ok', async () => {
    expect.assertions(2);
    const result = await validateCredential(legalAddress.v2, validJwt);
    expect(result.status).toBe(true);
    expect(result.errors).toBeNull();
  });

  it(`validate .vc.credentialSubject['Domicilio Legal'].preview.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(
      legalAddress.v2,
      invalidPreviewField,
    );
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Domicilio Legal'].preview.type`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Domicilio%20Legal/properties/preview/properties/type/type',
    );
    expect(result.errors[0].params.type).toBe('integer');
    expect(result.errors[0].message).toBe('should be integer');
  });

  it(`validate .vc.credentialSubject['Domicilio Legal'].data.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(legalAddress.v2, invalidDataField);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Domicilio Legal'].data['País']`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Domicilio%20Legal/properties/data/properties/Pa%C3%ADs/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  it('validate iss field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(legalAddress.v2, invalidIss);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.iss');
    expect(result.errors[0].schemaPath).toBe('#/properties/iss/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  it('validate sub field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(legalAddress.v2, invalidSub);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.sub');
    expect(result.errors[0].schemaPath).toBe('#/properties/sub/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });
});

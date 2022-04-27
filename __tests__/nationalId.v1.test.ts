import { validateCredential } from '../src/validator';
import { nationalId } from '../src/schemas/identity';

const validJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEyMzQ1Njc4OSwic3ViIjoiZGlkOmV0aHI6MHgwMDAiLCJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7IkRhdG9zIFBlcnNvbmFsZXMiOnsiY2F0ZWdvcnkiOiJpZGVudGl0eSIsInByZXZpZXciOnsidHlwZSI6MiwiZmllbGRzIjpbIk51bWVybyBkZSBJZGVudGlkYWQiLCJOb21icmUocykiLCJBcGVsbGlkbyhzKSIsIk5hY2lvbmFsaWRhZCJdLCJjYXJkTGF5b3V0IjpudWxsfSwiZGF0YSI6eyJDcmVkZW5jaWFsIjoiRGF0b3MgUGVyc29uYWxlcyIsIk5vbWJyZShzKSI6Ik5vbWJyZSIsIkFwZWxsaWRvKHMpIjoiQXBlbGxpZG8iLCJOYWNpb25hbGlkYWQiOiJOYWNpb25hbGlkYWQiLCJOdW1lcm8gZGUgSWRlbnRpZGFkIjoiMTIzNDU2In19fX0sImlzcyI6ImRpZDpldGhyOjB4MDAwIn0.rXX8Mm1wKPmlZna4w3JIHUMEJcTaFNTfuFQ1smnSwjM';
const invalidIss =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEyMzQ1Njc4OSwic3ViIjoiZGlkOmV0aHI6MHgwMDAiLCJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7IkRhdG9zIFBlcnNvbmFsZXMiOnsiY2F0ZWdvcnkiOiJpZGVudGl0eSIsInByZXZpZXciOnsidHlwZSI6MiwiZmllbGRzIjpbIk51bWVybyBkZSBJZGVudGlkYWQiLCJOb21icmUocykiLCJBcGVsbGlkbyhzKSIsIk5hY2lvbmFsaWRhZCJdLCJjYXJkTGF5b3V0IjpudWxsfSwiZGF0YSI6eyJDcmVkZW5jaWFsIjoiRGF0b3MgUGVyc29uYWxlcyIsIk5vbWJyZShzKSI6Ik5vbWJyZSIsIkFwZWxsaWRvKHMpIjoiQXBlbGxpZG8iLCJOYWNpb25hbGlkYWQiOiJOYWNpb25hbGlkYWQiLCJOdW1lcm8gZGUgSWRlbnRpZGFkIjoiMTIzNDU2In19fX0sImlzcyI6My4xNH0.A52bgbP2w6qlDptn4cQIi0GWlITNW4mGUUbSzArrc3M';
const invalidSub =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEyMzQ1Njc4OSwic3ViIjozLjE0LCJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7IkRhdG9zIFBlcnNvbmFsZXMiOnsiY2F0ZWdvcnkiOiJpZGVudGl0eSIsInByZXZpZXciOnsidHlwZSI6MiwiZmllbGRzIjpbIk51bWVybyBkZSBJZGVudGlkYWQiLCJOb21icmUocykiLCJBcGVsbGlkbyhzKSIsIk5hY2lvbmFsaWRhZCJdLCJjYXJkTGF5b3V0IjpudWxsfSwiZGF0YSI6eyJDcmVkZW5jaWFsIjoiRGF0b3MgUGVyc29uYWxlcyIsIk5vbWJyZShzKSI6Ik5vbWJyZSIsIkFwZWxsaWRvKHMpIjoiQXBlbGxpZG8iLCJOYWNpb25hbGlkYWQiOiJOYWNpb25hbGlkYWQiLCJOdW1lcm8gZGUgSWRlbnRpZGFkIjoiMTIzNDU2In19fX0sImlzcyI6ImRpZDpldGhyOjB4MDAwIn0.EsoyjAgxeUi04vAz-J_atBY2rrChlwmeuiSL3yprM_c';
const invalidDataField =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEyMzQ1Njc4OSwic3ViIjoiZGlkOmV0aHI6MHgwMDAiLCJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7IkRhdG9zIFBlcnNvbmFsZXMiOnsiY2F0ZWdvcnkiOiJpZGVudGl0eSIsInByZXZpZXciOnsidHlwZSI6MiwiZmllbGRzIjpbIk51bWVybyBkZSBJZGVudGlkYWQiLCJOb21icmUocykiLCJBcGVsbGlkbyhzKSIsIk5hY2lvbmFsaWRhZCJdLCJjYXJkTGF5b3V0IjpudWxsfSwiZGF0YSI6eyJDcmVkZW5jaWFsIjoiRGF0b3MgUGVyc29uYWxlcyIsIk5vbWJyZShzKSI6Ik5vbWJyZSIsIkFwZWxsaWRvKHMpIjoiQXBlbGxpZG8iLCJOYWNpb25hbGlkYWQiOiJOYWNpb25hbGlkYWQiLCJOdW1lcm8gZGUgSWRlbnRpZGFkIjoxMjM0NTZ9fX19LCJpc3MiOiJkaWQ6ZXRocjoweDAwMCJ9.S5roE1N3MtKfdcXVOc9bDPLv5qiA10vkqxJxe8Zl5JQ';
const invalidPreviewField =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEyMzQ1Njc4OSwic3ViIjoiZGlkOmV0aHI6MHgwMDAiLCJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7IkRhdG9zIFBlcnNvbmFsZXMiOnsiY2F0ZWdvcnkiOiJpZGVudGl0eSIsInByZXZpZXciOnsidHlwZSI6IjIiLCJmaWVsZHMiOlsiTnVtZXJvIGRlIElkZW50aWRhZCIsIk5vbWJyZShzKSIsIkFwZWxsaWRvKHMpIiwiTmFjaW9uYWxpZGFkIl0sImNhcmRMYXlvdXQiOm51bGx9LCJkYXRhIjp7IkNyZWRlbmNpYWwiOiJEYXRvcyBQZXJzb25hbGVzIiwiTm9tYnJlKHMpIjoiTm9tYnJlIiwiQXBlbGxpZG8ocykiOiJBcGVsbGlkbyIsIk5hY2lvbmFsaWRhZCI6Ik5hY2lvbmFsaWRhZCIsIk51bWVybyBkZSBJZGVudGlkYWQiOiIxMjM0NTYifX19fSwiaXNzIjoiZGlkOmV0aHI6MHgwMDAifQ.l7FHKLV4B4lO_bLFNy56ijJ7RtJ11yBktPfhqZ9EV5s';

describe('nationalId.v1.test', () => {
  it('validate ok', async () => {
    expect.assertions(2);
    const result = await validateCredential(nationalId.v1, validJwt);
    expect(result.status).toBe(true);
    expect(result.errors).toBeNull();
  });

  it('validate sub field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(nationalId.v1, invalidSub);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.sub');
    expect(result.errors[0].schemaPath).toBe('#/properties/sub/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  it(`validate .vc.credentialSubject['Datos Personales'].preview.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(nationalId.v1, invalidPreviewField);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Datos Personales'].preview.type`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Datos%20Personales/properties/preview/properties/type/type',
    );
    expect(result.errors[0].params.type).toBe('integer');
    expect(result.errors[0].message).toBe('should be integer');
  });

  it(`validate .vc.credentialSubject['Datos Personales'].data.type field FAIL`, async () => {
    expect.assertions(6);
    const result = await validateCredential(nationalId.v1, invalidDataField);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe(
      `.vc.credentialSubject['Datos Personales'].data['Numero de Identidad']`,
    );
    expect(result.errors[0].schemaPath).toBe(
      '#/properties/vc/properties/credentialSubject/properties/Datos%20Personales/properties/data/properties/Numero%20de%20Identidad/type',
    );
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });

  it('validate iss field FAIL', async () => {
    expect.assertions(6);
    const result = await validateCredential(nationalId.v1, invalidIss);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.iss');
    expect(result.errors[0].schemaPath).toBe('#/properties/iss/type');
    expect(result.errors[0].params.type).toBe('string');
    expect(result.errors[0].message).toBe('should be string');
  });
});

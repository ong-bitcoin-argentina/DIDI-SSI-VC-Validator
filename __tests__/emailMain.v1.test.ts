import { validateCredential } from '../src';
import { emailMain } from '../src/schemas/identity';

const emailJwt =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTUzNDY1NDksInN1YiI6ImRpZDpldGhyOjB4M2JjNzhmYmYyYjE0MTk1Zjg5NzFkNmMyNTUxMDkzZTUyYzg3OWI4YiIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiRW1haWwiOnsicHJldmlldyI6eyJ0eXBlIjowLCJmaWVsZHMiOlsiZW1haWwiXX0sImNhdGVnb3J5IjoiaWRlbnRpdHkiLCJkYXRhIjp7ImVtYWlsIjoiYXhlbGJhdTI0QGdtYWlsLmNvbSJ9fX19LCJpc3MiOiJkaWQ6ZXRocjoweDUxMDllMzcwMTVjOTE1Y2EyZmQ1ODVhNDEwNWNmNTRlYWJjYTE3ZjgifQ.29Im_8dfSnMiI3qTqM9rHjBAMHmwM90pmIfY8dsPDspZIaApMpseVvEwf4qZSapZcHUpkUqPldU5q6tJuki_qwA';
const emailIatFieldFail =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIxNTk1MzQ2NTQ5Iiwic3ViIjoiZGlkOmV0aHI6MHgzYmM3OGZiZjJiMTQxOTVmODk3MWQ2YzI1NTEwOTNlNTJjODc5YjhiIiwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJFbWFpbCI6eyJwcmV2aWV3Ijp7InR5cGUiOjAsImZpZWxkcyI6WyJlbWFpbCJdfSwiY2F0ZWdvcnkiOiJpZGVudGl0eSIsImRhdGEiOnsiZW1haWwiOiJheGVsYmF1MjRAZ21haWwuY29tIn19fX0sImlzcyI6ImRpZDpldGhyOjB4NTEwOWUzNzAxNWM5MTVjYTJmZDU4NWE0MTA1Y2Y1NGVhYmNhMTdmOCJ9.YM6OBKzXM8PJntfj0B2dR656TJ6WHgD1Llg6rOI2L_0';
const emailSubFieldFail =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTUzNDY1NDksInN1YiI6My43ODE0MTk1ODk3MTU1MTA3ZSsyMSwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJFbWFpbCI6eyJwcmV2aWV3Ijp7InR5cGUiOjAsImZpZWxkcyI6WyJlbWFpbCJdfSwiY2F0ZWdvcnkiOiJpZGVudGl0eSIsImRhdGEiOnsiZW1haWwiOiJheGVsYmF1MjRAZ21haWwuY29tIn19fX0sImlzcyI6ImRpZDpldGhyOjB4NTEwOWUzNzAxNWM5MTVjYTJmZDU4NWE0MTA1Y2Y1NGVhYmNhMTdmOCJ9.bFuhSxsvlB-Maii1edLdhb_gCgUcC4bbjwWL3njrpmY';
const emailJwtTypeFieldPreviewFail =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTUzNDY1NDksInN1YiI6ImRpZDpldGhyOjB4M2JjNzhmYmYyYjE0MTk1Zjg5NzFkNmMyNTUxMDkzZTUyYzg3OWI4YiIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiRW1haWwiOnsicHJldmlldyI6eyJ0eXBlIjoiMCIsImZpZWxkcyI6WyJlbWFpbCJdfSwiY2F0ZWdvcnkiOiJpZGVudGl0eSIsImRhdGEiOnsiZW1haWwiOiJheGVsYmF1MjRAZ21haWwuY29tIn19fX0sImlzcyI6ImRpZDpldGhyOjB4NTEwOWUzNzAxNWM5MTVjYTJmZDU4NWE0MTA1Y2Y1NGVhYmNhMTdmOCJ9.4EzQSy847ttTQUoOeOYnVoJF0jdJpmAXmX6asgiRftw';
const emailJwtTypeFieldDataFail =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTUzNDY1NDksInN1YiI6ImRpZDpldGhyOjB4M2JjNzhmYmYyYjE0MTk1Zjg5NzFkNmMyNTUxMDkzZTUyYzg3OWI4YiIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiRW1haWwiOnsicHJldmlldyI6eyJ0eXBlIjowLCJmaWVsZHMiOlsiZW1haWwiXX0sImNhdGVnb3J5IjoiaWRlbnRpdHkiLCJkYXRhIjp7ImVtYWlsIjoxMjM0NTY3ODl9fX19LCJpc3MiOiJkaWQ6ZXRocjoweDUxMDllMzcwMTVjOTE1Y2EyZmQ1ODVhNDEwNWNmNTRlYWJjYTE3ZjgifQ.ntl7P-sS7ycTnE4jTnpoTdwTLrEwUediEiIP-5dqyWQ';
const emailIssFieldFail =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTUzNDY1NDksInN1YiI6ImRpZDpldGhyOjB4M2JjNzhmYmYyYjE0MTk1Zjg5NzFkNmMyNTUxMDkzZTUyYzg3OWI4YiIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiRW1haWwiOnsicHJldmlldyI6eyJ0eXBlIjowLCJmaWVsZHMiOlsiZW1haWwiXX0sImNhdGVnb3J5IjoiaWRlbnRpdHkiLCJkYXRhIjp7ImVtYWlsIjoiYXhlbGJhdTI0QGdtYWlsLmNvbSJ9fX19LCJpc3MiOjUuMTA5MzcwMTUxNTg1NDFlKzIxfQ.9b6YlhXE4SaiuLMU_4lAntBYPFoMtHzSJU74Fn6bMK8';

test('Validate ok', async () => {
  const result = await validateCredential(emailMain.v1, emailJwt);
  expect(result.status).toBe(true);
  expect(result.errors).toBe(null);
});

test('Validate iat field FAIL', async () => {
  const result = await validateCredential(emailMain.v1, emailIatFieldFail);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.iat');
  expect(result.errors[0].schemaPath).toBe('#/properties/iat/type');
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].params.type).toBe('integer');
  expect(result.errors[0].message).toBe('should be integer');
});

test('Validate sub field FAIL', async () => {
  const result = await validateCredential(emailMain.v1, emailSubFieldFail);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.sub');
  expect(result.errors[0].schemaPath).toBe('#/properties/sub/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

test('Validate vc.credentialSubject.Email.preview.type field FAIL', async () => {
  const result = await validateCredential(
    emailMain.v1,
    emailJwtTypeFieldPreviewFail,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    '.vc.credentialSubject.Email.preview.type',
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Email/properties/preview/properties/type/type',
  );
  expect(result.errors[0].params.type).toBe('integer');
  expect(result.errors[0].message).toBe('should be integer');
});

test('Validate vc.credentialSubject.Email.data.email field FAIL', async () => {
  const result = await validateCredential(
    emailMain.v1,
    emailJwtTypeFieldDataFail,
  );
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe(
    '.vc.credentialSubject.Email.data.email',
  );
  expect(result.errors[0].schemaPath).toBe(
    '#/properties/vc/properties/credentialSubject/properties/Email/properties/data/properties/email/type',
  );
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

test('Validate sub field FAIL', async () => {
  const result = await validateCredential(emailMain.v1, emailIssFieldFail);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.iss');
  expect(result.errors[0].schemaPath).toBe('#/properties/iss/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

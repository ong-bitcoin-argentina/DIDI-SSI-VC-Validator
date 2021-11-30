import { validateCredential } from '../src';
import { mobilePhone } from '../src/schemas/identity';

const phoneJwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE2MzA0NDU2OTIsInN1YiI6ImRpZDpldGhyOjB4ODRiMmYxYzM0MzE3NmQyNjRhMThlOWRmMGZmZGE4MDM0ZDc3N2ZiNiIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiUGhvbmUiOnsicHJldmlldyI6eyJ0eXBlIjowLCJmaWVsZHMiOlsicGhvbmVOdW1iZXIiXX0sImNhdGVnb3J5IjoiaWRlbnRpdHkiLCJkYXRhIjp7InBob25lTnVtYmVyIjoiKzU0MjQ5NDYwMzI4NiJ9fX19LCJpc3MiOiJkaWQ6ZXRocjoweDJiMTg0MjAzYmFiZWZlMzA2OTAxYTc2YjA1M2JjMzg2NTllNGE3OTUifQ.xxCd7H-wdSZyO60h7IUZpi4FjhrphZS45N_pRKXsfGSWo5_X_DvMysdaT1ykJRH2UkoEoPFEAAbDi953buLFgwE'
const phoneJwtTypeFieldFail = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzA0NDU2OTIsInN1YiI6ImRpZDpldGhyOjB4ODRiMmYxYzM0MzE3NmQyNjRhMThlOWRmMGZmZGE4MDM0ZDc3N2ZiNiIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiUGhvbmUiOnsicHJldmlldyI6eyJ0eXBlIjoiMCIsImZpZWxkcyI6WyJwaG9uZU51bWJlciJdfSwiY2F0ZWdvcnkiOiJpZGVudGl0eSIsImRhdGEiOnsicGhvbmVOdW1iZXIiOiIrNTQyNDk0NjAzMjg2In19fX0sImlzcyI6ImRpZDpldGhyOjB4MmIxODQyMDNiYWJlZmUzMDY5MDFhNzZiMDUzYmMzODY1OWU0YTc5NSJ9.a4TlMDDkgmQBwh4E0UoA83o_WiaH2dmO1qZIAYDOASE'
const phoneIatFieldFail = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIxNjMwNDQ1NjkyIiwic3ViIjoiZGlkOmV0aHI6MHg4NGIyZjFjMzQzMTc2ZDI2NGExOGU5ZGYwZmZkYTgwMzRkNzc3ZmI2IiwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJQaG9uZSI6eyJwcmV2aWV3Ijp7InR5cGUiOjAsImZpZWxkcyI6WyJwaG9uZU51bWJlciJdfSwiY2F0ZWdvcnkiOiJpZGVudGl0eSIsImRhdGEiOnsicGhvbmVOdW1iZXIiOiIrNTQyNDk0NjAzMjg2In19fX0sImlzcyI6ImRpZDpldGhyOjB4MmIxODQyMDNiYWJlZmUzMDY5MDFhNzZiMDUzYmMzODY1OWU0YTc5NSJ9.W_CvkD02lc4GVXv3cgvQ9zgNjyHmUB0rRWxoOLymbdA'
const phoneSubFieldFail = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzA0NDU2OTIsInN1YiI6MjEzNDMxNzYyNiwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJQaG9uZSI6eyJwcmV2aWV3Ijp7InR5cGUiOjAsImZpZWxkcyI6WyJwaG9uZU51bWJlciJdfSwiY2F0ZWdvcnkiOiJpZGVudGl0eSIsImRhdGEiOnsicGhvbmVOdW1iZXIiOiIrNTQyNDk0NjAzMjg2In19fX0sImlzcyI6ImRpZDpldGhyOjB4MmIxODQyMDNiYWJlZmUzMDY5MDFhNzZiMDUzYmMzODY1OWU0YTc5NSJ9.Y8zkO7wk2hxQnfn0igad6uAZ8CBjkZKXCy9NiDlJ44g'
const phoneIssFieldFail = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzA0NDU2OTIsInN1YiI6ImRpZDpldGhyOjB4ODRiMmYxYzM0MzE3NmQyNjRhMThlOWRmMGZmZGE4MDM0ZDc3N2ZiNiIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiUGhvbmUiOnsicHJldmlldyI6eyJ0eXBlIjowLCJmaWVsZHMiOlsicGhvbmVOdW1iZXIiXX0sImNhdGVnb3J5IjoiaWRlbnRpdHkiLCJkYXRhIjp7InBob25lTnVtYmVyIjoiKzU0MjQ5NDYwMzI4NiJ9fX19LCJpc3MiOjM4NjU5NDc5NX0.K2LmVdt8xWPckdvHcHcas5NZ8THB-hdk5Dfo61OBASQ'

test('Validate OK', async () => {
  const result = await validateCredential(mobilePhone.v1, phoneJwt);
  expect(result.status).toBe(true);
  expect(result.errors).toBe(null);
});

test('Validate iat field FAIL', async () => {
  const result = await validateCredential(mobilePhone.v1, phoneIatFieldFail);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.iat');
  expect(result.errors[0].schemaPath).toBe('#/properties/iat/type');
  expect(result.errors[0].params.type).toBe('integer');
  expect(result.errors[0].message).toBe('should be integer');
});

test('Validate sub field FAIL', async () => {
  const result = await validateCredential(mobilePhone.v1, phoneSubFieldFail);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.sub');
  expect(result.errors[0].schemaPath).toBe('#/properties/sub/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});

test('Validate vc.credentialSubject.Phone.preview.type field FAIL', async () => {
  const result = await validateCredential(mobilePhone.v1, phoneJwtTypeFieldFail);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.vc.credentialSubject.Phone.preview.type');
  expect(result.errors[0].schemaPath).toBe('#/properties/vc/properties/credentialSubject/properties/Phone/properties/preview/properties/type/type');
  expect(result.errors[0].params.type).toBe('integer');
  expect(result.errors[0].message).toBe('should be integer');
});

test('Validate iss field FAIL', async () => {
  const result = await validateCredential(mobilePhone.v1, phoneIssFieldFail);
  expect(result.status).toBe(false);
  expect(result.errors[0].keyword).toBe('type');
  expect(result.errors[0].dataPath).toBe('.iss');
  expect(result.errors[0].schemaPath).toBe('#/properties/iss/type');
  expect(result.errors[0].params.type).toBe('string');
  expect(result.errors[0].message).toBe('should be string');
});
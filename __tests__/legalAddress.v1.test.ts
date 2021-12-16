import { validateCredential } from '../src/validator';
import { legalAddress } from '../src/schemas/identity';

const validJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTUzNDY1NDksInN1YiI6ImRpZDpldGhyOjB4M2JjNzhmYmYyYjE0MTk1Zjg5NzFkNmMyNTUxMDkzZTUyYzg3OWI4YiIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiRG9taWNpbGlvIExlZ2FsIjp7InByZXZpZXciOnsiZmllbGRzIjpbInN0cmVldEFkZHJlc3MiLCJudW1iZXJTdHJlZXQiLCJ6aXBDb2RlIiwiY2l0eSIsInByb3ZpbmNlIiwiY291bnRyeSJdLCJ0eXBlIjoxfSwiY2F0ZWdvcnkiOiJpZGVudGl0eSIsImRhdGEiOnsic3RyZWV0QWRkcmVzcyI6IkFWLiBERUwgTElCRVJUQURPUiIsIm51bWJlclN0cmVldCI6IjQ3MzAiLCJmbG9vciI6IjgiLCJkZXBhcnRtZW50IjoiQiIsInppcENvZGUiOiIxNDI2IiwiY2l0eSI6IkJFTEdSQU5PIiwibXVuaWNpcGFsaXR5IjoiQ0lVREFEIERFIEJVRU5PUyBBSVJFUyIsInByb3ZpbmNlIjoiQ0lVREFEIERFIEJVRU5PUyBBSVJFUyIsImNvdW50cnkiOiJBUkdFTlRJTkEifX19fSwiaXNzIjoiZGlkOmV0aHI6MHg1MTA5ZTM3MDE1YzkxNWNhMmZkNTg1YTQxMDVjZjU0ZWFiY2ExN2Y4In0.PZQ1gChFdg0CgBYzniAiRg7Wj5DPNbuVv6Qktg6dX6g';
const invalidIat =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIxNTk1MzQ2NTQ5Iiwic3ViIjoiZGlkOmV0aHI6MHgzYmM3OGZiZjJiMTQxOTVmODk3MWQ2YzI1NTEwOTNlNTJjODc5YjhiIiwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJEb21pY2lsaW8gTGVnYWwiOnsicHJldmlldyI6eyJmaWVsZHMiOlsic3RyZWV0QWRkcmVzcyIsIm51bWJlclN0cmVldCIsInppcENvZGUiLCJjaXR5IiwicHJvdmluY2UiLCJjb3VudHJ5Il0sInR5cGUiOjF9LCJjYXRlZ29yeSI6ImlkZW50aXR5IiwiZGF0YSI6eyJzdHJlZXRBZGRyZXNzIjoiQVYuIERFTCBMSUJFUlRBRE9SIiwibnVtYmVyU3RyZWV0IjoiNDczMCIsImZsb29yIjoiOCIsImRlcGFydG1lbnQiOiJCIiwiemlwQ29kZSI6IjE0MjYiLCJjaXR5IjoiQkVMR1JBTk8iLCJtdW5pY2lwYWxpdHkiOiJDSVVEQUQgREUgQlVFTk9TIEFJUkVTIiwicHJvdmluY2UiOiJDSVVEQUQgREUgQlVFTk9TIEFJUkVTIiwiY291bnRyeSI6IkFSR0VOVElOQSJ9fX19LCJpc3MiOiJkaWQ6ZXRocjoweDUxMDllMzcwMTVjOTE1Y2EyZmQ1ODVhNDEwNWNmNTRlYWJjYTE3ZjgifQ.4WaV6-jo-eNHA5a6ka9p_Fxx4cAfZVpqYzpfzQqsNYI';
const invalidSub =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTUzNDY1NDksInN1YiI6My43ODE0MTk1ODk3MTU1MTA3ZSsyMSwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJEb21pY2lsaW8gTGVnYWwiOnsicHJldmlldyI6eyJmaWVsZHMiOlsic3RyZWV0QWRkcmVzcyIsIm51bWJlclN0cmVldCIsInppcENvZGUiLCJjaXR5IiwicHJvdmluY2UiLCJjb3VudHJ5Il0sInR5cGUiOjF9LCJjYXRlZ29yeSI6ImlkZW50aXR5IiwiZGF0YSI6eyJzdHJlZXRBZGRyZXNzIjoiQVYuIERFTCBMSUJFUlRBRE9SIiwibnVtYmVyU3RyZWV0IjoiNDczMCIsImZsb29yIjoiOCIsImRlcGFydG1lbnQiOiJCIiwiemlwQ29kZSI6IjE0MjYiLCJjaXR5IjoiQkVMR1JBTk8iLCJtdW5pY2lwYWxpdHkiOiJDSVVEQUQgREUgQlVFTk9TIEFJUkVTIiwicHJvdmluY2UiOiJDSVVEQUQgREUgQlVFTk9TIEFJUkVTIiwiY291bnRyeSI6IkFSR0VOVElOQSJ9fX19LCJpc3MiOiJkaWQ6ZXRocjoweDUxMDllMzcwMTVjOTE1Y2EyZmQ1ODVhNDEwNWNmNTRlYWJjYTE3ZjgifQ.LtHsEIlZyplDDYHl__byd6Cb3siVIhZf_Svema7CsDI';

describe('legalAddress.v1.test', () => {
  it('validate OK', async () => {
    expect.assertions(2);
    const result = await validateCredential(legalAddress, validJwt);
    expect(result.status).toBe(true);
    expect(result.errors).toBeNull();
  });

  it('validate iat field FAIL', async () => {
    expect.assertions(7);
    const result = await validateCredential(legalAddress.v1, invalidIat);
    expect(result.status).toBe(false);
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].dataPath).toBe('.iat');
    expect(result.errors[0].schemaPath).toBe('#/properties/iat/type');
    expect(result.errors[0].keyword).toBe('type');
    expect(result.errors[0].params.type).toBe('integer');
    expect(result.errors[0].message).toBe('should be integer');
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

const { validateCredential } = require('../src/validator');
const {emailSchema } = require('../src/schema/email/email-schema-v1.js');
const emailJwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1OTUzNDY1NDksInN1YiI6ImRpZDpldGhyOjB4M2JjNzhmYmYyYjE0MTk1Zjg5NzFkNmMyNTUxMDkzZTUyYzg3OWI4YiIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiRW1haWwiOnsicHJldmlldyI6eyJ0eXBlIjowLCJmaWVsZHMiOlsiZW1haWwiXX0sImNhdGVnb3J5IjoiaWRlbnRpdHkiLCJkYXRhIjp7ImVtYWlsIjoiYXhlbGJhdTI0QGdtYWlsLmNvbSJ9fX19LCJpc3MiOiJkaWQ6ZXRocjoweDUxMDllMzcwMTVjOTE1Y2EyZmQ1ODVhNDEwNWNmNTRlYWJjYTE3ZjgifQ.29Im_8dfSnMiI3qTqM9rHjBAMHmwM90pmIfY8dsPDspZIaApMpseVvEwf4qZSapZcHUpkUqPldU5q6tJuki_qwA';

test('Validate ok', async () => {
    result = await validateCredential(emailSchema, emailJwt);
    expect(result.status).toBe(true);
    expect(result.errors).toBe(null);
});
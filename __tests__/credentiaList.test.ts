import { getTypes, getCategories, getVersions } from '../src/credentialList';

describe('__tests__/credentiaList.test.ts', () => {
  it('getNames', async () => {
    expect.assertions(2);
    const types: string[] = getTypes();
    expect(types).toBeTruthy();
    expect(types).toHaveLength(12);
  });

  it('getCategories', async () => {
    expect.assertions(2);
    const categories: string[] = getCategories();
    expect(categories).toBeTruthy();
    expect(categories).toHaveLength(5);
  });

  it('getVersions', async () => {
    expect.assertions(2);
    const versions: string[] = getVersions('benefit', 'semillaSembFamiliar');
    expect(versions).toBeTruthy();
    expect(versions).toHaveLength(1);
  });

  it('getVersions to throw', async () => {
    expect.assertions(1);
    const wrapperFunction = () => {
      getVersions('benefit', 'asd');
    };
    // eslint-disable-next-line jest/require-to-throw-message
    expect(wrapperFunction).toThrow();
  });
});

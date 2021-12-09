import { getTypes, getCategories, getVersions } from '../src/credentialList';

test('getNames  - Always green', async () => {
  const types: string[] = getTypes();
  expect(types).toBeTruthy();
  expect(types).toHaveLength(10);
});

test('getCategories  - Always green', async () => {
  const categories: string[] = getCategories();
  expect(categories).toBeTruthy();
  expect(categories).toHaveLength(3);
});

test('getCategories  - Always green', async () => {
  const versions: string[] = getVersions('benefit', 'semillaSembFamiliar');
  expect(versions).toBeTruthy();
  expect(versions).toHaveLength(1);
});

test('getCategories ', async () => {
  const wrapperFunction = () => {
    getVersions('benefit', 'asd');
  };
  expect(wrapperFunction).toThrow();
});

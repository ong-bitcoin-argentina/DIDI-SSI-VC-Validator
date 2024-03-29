import * as schemas from './schemas';

const { schemasByName } = require('./constants');

export function getTypes(): string[] {
  let types: string[] = [];
  Object.values(schemas).forEach((category: object) => {
    types = [...types, ...Object.keys(category)];
  });
  return types;
}

export function getCategories(): string[] {
  const categories: string[] = Object.keys(schemas);
  return categories;
}

export function getVersions(category: string, type: string): string[] {
  // @ts-expect-error Index are string like
  if (!schemas[category] || !schemas[category][type]) {
    throw new Error('#vcValidator-getVersions-categoryAndTypeNotFound');
  }

  // @ts-expect-error Index are string like
  const versions: string[] = Object.keys(schemas[category][type]);
  return versions;
}

export function getNames(): object {
  return schemasByName.keys();
}

export function getSchemaByName(name: string): [object] {
  return schemasByName.get(name);
}

export function getLastVersion(name: string): string {
  const versions = Object.keys(getSchemaByName(name));
  return versions[0];
}

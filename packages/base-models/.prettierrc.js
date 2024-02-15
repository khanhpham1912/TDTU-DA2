// @ts-check
/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */

module.exports = {
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  importOrder: ['@nestjs', 'wareflex', '@libs', '^components/(.*)$', '^[./]'],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

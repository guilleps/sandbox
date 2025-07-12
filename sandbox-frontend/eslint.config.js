// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-plugin-prettier');

module.exports = tseslint.config(
	{
		files: ['**/*.ts'],
		languageOptions: {
			parserOptions: {
				project: ['tsconfig.json'],
				tsconfigRootDir: __dirname,
			},
		},
		ignores: ['node_modules/'],
		plugins: {
			prettier
		},
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
			...angular.configs.tsRecommended,
		],
		processor: angular.processInlineTemplates,
		rules: {
			'@angular-eslint/prefer-standalone': 'off',
			'@angular-eslint/prefer-inject': 'off',
			'@angular-eslint/use-component-view-encapsulation': 'error',
			'@angular-eslint/no-output-on-prefix': 'off',
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
			'@typescript-eslint/consistent-type-definitions': 'error',
			'@typescript-eslint/no-var-requires': 'error',
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'enum',
					format: ['PascalCase'],
				},
			],
			'prettier/prettier': 'error',
		},
	},
	{
		files: ['**/*.html'],
		extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
		rules: {},
	},
);

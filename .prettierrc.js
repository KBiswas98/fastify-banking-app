// .prettierrc.js
module.exports = {
	printWidth: 150,
	useTabs: true,
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	bracketSpacing: true,
	arrowParens: 'avoid',
	parser: 'flow',
	overrides: [
		{
			files: '*.css',
			options: {
				parser: 'css',
			},
		},
	],
}

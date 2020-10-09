const { h$, p, ul, li } = require('../src/lexer/modules/tooken')

describe('basic test, generator()', () => {
	test('h3', () => {
		expect(h$(3, 'hej')).toStrictEqual({
			name: "h3",
			attributes: undefined, 
			content: ["hej"], 
		})
	})

	test('p', () => {
		expect(p('hej')).toStrictEqual({
			name: "p",
			attributes: undefined, 
			content: ["hej"], 
		})
	})
	test('ul', () => {
		expect(ul(li('hej'))).toStrictEqual({
			name: "ul",
			attributes: undefined,
			content: {
				name: "li",
				attributes: undefined,
				content: ["hej"],
			},
		})
	})
})
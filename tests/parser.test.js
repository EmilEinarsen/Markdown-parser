const parser = require('../src/parser/parser')
const getFile = require('./files/getFile')

describe('file test, lexer', () => {

	test('testfile1', async () => {
		expect(
			parser(tookenList())
		).toBe(
			await getFile('./tests/files/text1.html')
		)
	})
})

function tookenList() {
	return [
		{
			name: "h6",
			attributes: undefined,
			content: ["hejhejehejhej"]
		},
		{ name: undefined, attributes: undefined, content: undefined, },
		{
			name: "p",
			attributes: undefined,
			content: ["<b>ser du denne</b> <em>isådanfall detta me</em>"]
		},
		{ name: undefined, attributes: undefined, content: undefined, },
		{
			name: "p",
			attributes: undefined,
			content: ["hej"]
		},
		{
			name: "ul",
			attributes: undefined,
			content: [
				{
					name: "li",
					attributes: undefined,
					content: ["hej"]
				},
				{
					name: "li",
					attributes: undefined,
					content: ["hejhej"]
				},
				{
					name: "li",
					attributes: undefined,
					content: ["äöåpö"]
				}
			]
		},
		{ name: undefined, attributes: undefined, content: undefined, },
		{
			name: "h1",
			attributes: undefined,
			content: ["hej"]
		},
		{ name: undefined, attributes: undefined, content: undefined, },
		{
			name: "p",
			attributes: undefined,
			content: ["###hdhdh"]
		},
		{ name: undefined, attributes: undefined, content: undefined, },
		{
			name: "h6",
			attributes: undefined,
			content: ["hej"]
		},
		{ name: undefined, attributes: undefined, content: undefined, },
		{
			name: "p",
			attributes: undefined,
			content: ["#######"]
		},
		{ name: undefined, attributes: undefined, content: undefined, },
		{
			name: "h5",
			attributes: undefined,
			content: ["jek"]
		},
		{ name: undefined, attributes: undefined, content: undefined, },
		{
			name: "h6",
			attributes: undefined,
			content: ["j"]
		},
		{ name: undefined, attributes: undefined, content: undefined, },
		{
			name: "ul",
			attributes: undefined,
			content: [
				{
					name: "li",
					attributes: undefined,
					content: ["start"]
				},
				{
					name: "ul",
					attributes: undefined,
					content: [
						{
							name: "li",
							attributes: undefined,
							content: ["firstinner"]
						},
						{
							name: "li",
							attributes: undefined,
							content: ["secondinner"]
						}
					]
				}
			]
		},
		{ name: undefined, attributes: undefined, content: undefined, },
		{ name: undefined, attributes: undefined, content: undefined, },
	]
}
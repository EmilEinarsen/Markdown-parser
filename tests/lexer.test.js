const lexer = require('../src/lexer/lexer')
const getFile = require('./files/getFile')

describe('basic should, one row', () => {

	test('header (h6)', () => expect(
		lexer('###### hejhejehejhej')
	).toStrictEqual([{
		"attributes": undefined, 
		"content": ["hejhejehejhej"], 
		"name": "h6"
	}]))

	test('header with more then 6"#" (h6)', () => expect(
		lexer('###################### hejhejehejhej')
	).toStrictEqual([{
		"attributes": undefined, 
		"content": ["hejhejehejhej"], 
		"name": "h6"
	}]))
	test('regular p test', () => expect(
		lexer(' hejhejehejhej')
	).toStrictEqual([{
		"attributes": undefined, 
		"content": [" hejhejehejhej"], 
		"name": "p"
	}]))

	test('special p test of, ########## ', () => expect(
		lexer('########## ')
	).toStrictEqual([{
		"attributes": undefined, 
		"content": ["########## "],
		"name": "p"
	}]))
})

describe('basic shouldnot, one row', () => {
	
})

describe('basic should, mulit row', () => {
	test('simple list', () => {
		expect(
			lexer('* hej\r\n* hejhej\r\n* äöåpö')
		).toStrictEqual([{
			name: "ul",
			attributes: undefined, 
			content: [
				{
					name: "li",
					attributes: undefined, 
					content: ["hej"], 
				}, 
				{
					name: "li",
					attributes: undefined, 
					content: ["hejhej"], 
				}, 
				{
					name: "li",
					attributes: undefined, 
					content: ["äöåpö"], 
				}
			] 
		}])
	})
	test('nested list', () => {
		expect(
			lexer('* start\r\n\t* firstinner\r\n\t* secondinner')
		).toStrictEqual([{
			name: "ul",
			attributes: undefined, 
			content: [
				{
					name: "li",
					attributes: undefined, 
					content: ["start"], 
				}, 
				{
					name: "ul",
					attributes: undefined, 
					content: [
						{
							name: "li",
							attributes: undefined, 
							content: ["firstinner"], 
						}, 
						{
							name: "li",
							attributes: undefined, 
							content: ["secondinner"], 
						}
					]
				}
			]
		}])
	})
	test('lvl 2 nested list', () => {
		expect(
			lexer('* lvl0-1\r\n* lvl0-2\r\n\t* lvl1\r\n\t\t* lvl2-1\r\n\t\t* lvl2-2')
		).toStrictEqual([{
			name: "ul",
			attributes: undefined, 
			content: [
				{
					name: "li",
					attributes: undefined, 
					content: ["lvl0-1"], 
				},
				{
					name: "li",
					attributes: undefined, 
					content: ["lvl0-2"], 
				}, 
				{
					name: "ul",
					attributes: undefined, 
					content: [
						{
							name: "li",
							attributes: undefined, 
							content: ["lvl1"], 
						}, 
						{
							name: "ul",
							attributes: undefined, 
							content: [
								{
									name: "li",
									attributes: undefined,
									content: ["lvl2-1"],
								},
								{
									name: "li",
									attributes: undefined,
									content: ["lvl2-2"],
								},
							],
						}
					]
				}
			]
		}])
	})
})

describe('file test, lexer', () => {

	test('testfile1', async () => {
		expect(
			lexer(await getFile('./tests/files/text1.md'))
		).toStrictEqual([
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
		)
	})
})
describe('CodeBlock', () => {
	test('basic', () => {
		expect(
			lexer('```\nhej\ndå\n```')
		).toStrictEqual([
			{
				name: "pre",
				attributes: undefined, 
				content: [
					{
						name: "p",
						attributes: undefined, 
						content: ["hej\ndå"],
					}
				], 
			}
		])
	})
})
describe('QuoteBlock', () => {
	test('lvl 2 nested QuoteBlock', () => {
		expect(
			lexer(
`
>1
>2
>>3
>4
`
			)
		).toStrictEqual([
			{
				name: undefined,
				attributes: undefined, 
				content: undefined, 
			}, 
			{
				name: "blockquote",
				attributes: undefined, 
				content: [
					{
						name: "p",
						attributes: undefined, 
						content: [" 1 2"], 
					}, 
					{
						name: "blockquote",		
						attributes: undefined, 
						content: [
							{
								name: "p",
								attributes: undefined, 
								content: [" 3 4"], 
							}
						], 
					}
				],
			},
			{ attributes: undefined, content: undefined, name: undefined },
		])
	})
	test('Lazy lvl 2 nested QuoteBlock', () => {
		expect(
			lexer(
`
>1
2
>>3
4
`
			)
		).toStrictEqual(
			lexer(
`
>1
>2
>>3
>4
`
			)
		)
	})
	test('Lazy lvl 2 nested QuoteBlock with list', () => {
		expect(
			lexer(
`
>* 1
* 2
> * 3
>>* 4
`
			)
		).toStrictEqual([
			{ attributes: undefined, content: undefined, name: undefined },
			{
				name: "blockquote",
				attributes: undefined,
				content: [
					{
						name: "ul",
						attributes: undefined,
						content: [
							{
								name: "li",
								attributes: undefined,
								content: [
									"1"
								]
							},
							{
								name: "li",
								attributes: undefined,
								content: [
									" 2"
								]
							},
							{
								name: "li",
								attributes: undefined,
								content: [
									" 3"
								]
							}
						]
					},
					{
						name: "blockquote",
						attributes: undefined,
						content: [
							{
								name: "ul",
								attributes: undefined,
								content: [
									{
										name: "li",
										attributes: undefined,
										content: [
											"4"
										]
									}
								]
							}
						]
					}
				]
			},
			{ attributes: undefined, content: undefined, name: undefined },
		])
	})
})
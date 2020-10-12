const markdown = require('../src/markdown')
const getFile = require('./files/getFile')

describe('markdown', () => {
	test('basic, test1', async () => {
		expect(
			markdown(await getFile('./tests/files/text1.md'))
		).toBe(
			await getFile('./tests/files/text1.html')
		)
	})
	test('test2', async () => {
		expect(
			markdown(`# **hej**\n# hej\n## hej\n### hej\n#### hej\n##### hej\n###### hej\n*hej*`)
		).toBe(
			"<h1><b>hej</b></h1><h1>hej</h1><h2>hej</h2><h3>hej</h3><h4>hej</h4><h5>hej</h5><h6>hej</h6><p><em>hej</em></p>"
		)
	})
	test('codeblock', () => {
		expect(
			markdown('```\nhej\ndå\n```')
		).toBe(
			`<pre><p>hej\ndå</p></pre>`
		)
	})
	test('codeblock', () => {
		expect(
			markdown(
`>1
2
>>3
4`
			)
		).toBe(
			'<blockquote><p>1 2</p><blockquote><p>3 4</p></blockquote></blockquote>'
		)
	})
})
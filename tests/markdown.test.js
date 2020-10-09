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
})
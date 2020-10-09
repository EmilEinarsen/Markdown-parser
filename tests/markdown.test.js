const markdown = require('../markdown')
const getFile = require('../files/getFile')

describe('markdown', () => {
	test('basic, test1', async () => {
		expect(
			markdown(await getFile('./files/text1.md'))
		).toBe(
			await getFile('./files/text1.html')
		)
	});
});
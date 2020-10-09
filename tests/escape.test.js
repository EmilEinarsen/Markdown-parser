const escape = require('../src/lexer/modules/escape')

describe('escapeHTML', () => {
	test('basic', () => {
		expect(
			escape(
				"The 'pre-formatted' tag is written \"<pre>\" & don't forget to close </pre>."
			)
		).toBe("The 'pre-formatted' tag is written &quot;&lt;pre&gt;&quot; &amp; don't forget to close &lt;/pre&gt;.")
	});
});
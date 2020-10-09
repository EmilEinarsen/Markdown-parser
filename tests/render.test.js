const render = require('../parser/modules/render')

describe('render()', () => {
	test('linktag', () => {
		expect(render({
			name: 'a',
			attributes: {'href': 'https://google.se/'},
			content: ['google']
		})).toBe(
			`<a href="https://google.se/">google</a>`
		)
	})

	test('empty img tag', () => {
		expect(render({
			name: 'img'
		})).toBe(
			`<img />`
		)
	})

	test('img nested in div with classes', () => {
		expect(render({
			name: 'div',
			attributes: {'class': 'flex padding-t-2'},
			content: [{
				name: 'img',
				attributes: {'class': 'flex padding-t-2'}
			}]
		})).toBe(
			`<div class="flex padding-t-2"><img class="flex padding-t-2" /></div>`
		)
	})
});
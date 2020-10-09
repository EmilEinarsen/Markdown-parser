const styler = require('../lexer/modules/styler')

describe('styler basic', () => {
	test('bold with __$__', () => expect(styler('__hej__')).toBe('<b>hej</b>'))

	test('italic with _$_', () => expect(styler('_hej_')).toBe('<em>hej</em>'))

	test('bold with **$**', () => expect(styler('**hej**')).toBe('<b>hej</b>'))

	test('italic with *$*', () => expect(styler('*hej*')).toBe('<em>hej</em>'))

	test('link with [$]($)', () => expect(styler('[Google](https://google.se/)')).toBe('<a href="https://google.se/">Google</a>'))
})

describe('style offset', () => {
	test('bold with ___$__', () => expect(styler('___hej__')).toBe('<b>_hej</b>'))

	test('italic with __$_', () => expect(styler('__hej_')).toBe('<em>_hej</em>'))

	test('bold with **$***', () => expect(styler('**hej***')).toBe('<b>hej*</b>'))

	test('italic with *$**', () => expect(styler('*hej**')).toBe('<em>hej*</em>'))

	test('link with [[$]($)', () => expect(styler('[[Google](https://google.se/)')).toBe('<a href="https://google.se/">[Google</a>'))
	
	test('bold and italic __$__ *$*', () => expect(
		styler('__ser du denne__ *isådanfall detta me*')
	).toBe('<b>ser du denne</b> <em>isådanfall detta me</em>'))
})

describe('styler basic', () => {
	test('not bold with _$__', () => expect(styler('_hej__')).not.toBe('<b>hej</b>'))

	test('not italic with $_', () => expect(styler('hej_')).not.toBe('<em>hej</em>'))

	test('not bold with *$**', () => expect(styler('*hej**')).not.toBe('<b>hej</b>'))

	test('not italic with $*', () => expect(styler('hej*')).not.toBe('<em>hej</em>'))

	test('not link with [$] ($)', () => expect(styler('[Google] (https://google.se/)')).not.toBe('<a href="https://google.se/">Google</a>'))
})


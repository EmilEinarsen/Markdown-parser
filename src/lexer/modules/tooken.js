const styler = require('./styler')
const escape = require('./escape')

const tag = (
	name, 
	content, 
	attributes,
) => ({
	name, 
	attributes: attributes, 
	content: content,
})

const h$ = (
	header,
	content
) => tag(
	`h${header <= 6 ? header : 6}`,
	[styler(escape(content))]
)

const p = (
	content
) => tag(
	'p',
	[styler(escape(content))]
)

const ul = (
	content
) => tag(
	'ul',
	content
)

const ol = (
	content
) => tag(
	'ol',
	content
)

const li = (
	content
) => tag(
	'li',
	[styler(escape(content))]
)

const pre = (
	content
) => tag(
	'pre',
	[content]
)
const blockquote = (
	content
) => tag(
	'blockquote',
	content
)

module.exports = { tag, p, ul, ol, li, h$, pre, blockquote }
function render(tooken) {
	let pieces = []
	
	render(tooken)

	return pieces.join("")
	
	
	function render(tooken) {
		const { name, content, attributes } = tooken

		typeof tooken == "string" ? textNode()
			: !name && !content && !attributes ? lineBreak()
			: !content || content.length == 0 ? tagEmpty()
			: tagContent()


		function textNode() {
			pieces.push(tooken.trim())
		}

		function lineBreak() {
			pieces.push('<br>')
		}

		function tagEmpty() {
			pieces.push(`<${name}${getAttributes()} />`)
		}

		function tagContent() {
			pieces.push(`<${name}${getAttributes()}>`)
			content.forEach(content => render(content))
			pieces.push(`</${name}>`)
		}

		function getAttributes() {
			if (!attributes) return ''
			let result = []

			renderAttributes()
			
			return result.join('')
	
			function renderAttributes() {
				for (let name in attributes)
					result.push(` ${name}="${attributes[name]}"`)
			}
		}

	}
}

module.exports = render
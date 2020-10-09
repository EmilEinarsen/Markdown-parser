function escape(text) {
	const replacements = {
		"<": "&lt;", ">": "&gt;",
		"&": "&amp;", "\"": "&quot;"
	}

	return replace(
		replacements, 
		text
	)

	function replace(replacements, text) {
		return text.replace(
			/[<>&"]/g, 
			char => replacements[char]
		)
	}
}

module.exports = escape
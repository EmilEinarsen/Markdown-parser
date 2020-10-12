function styler(string) {
	
	return string
		.replace(/\*\*\*(.*?)\*\*\*/gi, '<em><b>$1</b></em>')
		.replace(/\_\_\_(.*?)\_\_\_/gi, '<b><em>$1</em></b>')
		.replace(/\_\_(.*?)\_\_/gi, '<b>$1</b>')
		.replace(/\*\*(.*?)\*\*/gi, '<b>$1</b>')
		.replace(/\*(.*?)\*/gi, '<em>$1</em>')
		.replace(/\_(.*?)\_/gi, '<em>$1</em>')
		.replace(/\[(.*?)\]\((.*?)\)/gi, `<a href="$2">$1</a>`)
		.replace(/\[(.*?)\]/gi, `<a href="$1">$1</a>`)
		.replace(/`(.*?)`/gi, `<code>$1</code>`)
}

module.exports = styler
function styler(string) {
	
	return string
		.replace(/\*\*\*(.*)\*\*\*/g, '<em><b>$1</b></em>')
		.replace(/\_\_\_(.*)\_\_\_/g, '<b><em>$1</em></b>')
		.replace(/\*\_\_(.*)\_\_\*/g, '<b><em>$1</em></b>')
		.replace(/\*\*\_(.*)\_\*\*/g, '<b><em>$1</em></b>')
		.replace(/\*\*(.*)\*\*/g, '<b>$1</b>')
		.replace(/\*(.*)\*/g, '<em>$1</em>')
		.replace(/\_\_(.*)\_\_/g, '<b>$1</b>')
		.replace(/\_(.*)\_/g, '<em>$1</em>')
		.replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2">$1</a>`)
}

module.exports = styler
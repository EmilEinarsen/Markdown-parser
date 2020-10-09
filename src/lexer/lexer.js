const { tag, p, ul, li, h$  } = require('./modules/tooken')

function lexer(sourceCode) {
	sourceCode = sourceCode.split(/\r\n/g)

	let tokeenList = tookenfier(sourceCode)
	
	return tokeenList
}


function tookenfier(sourceCode) {
	let tookenList = []
	let pointer = 0

	while(pointer < sourceCode.length) {
		let string = sourceCode[pointer]

		controller(string)
		
		pointer++
	}
	return tookenList


	function controller(string) {
		tookenList.push(
			string[0] === '#' ? header()
				: string[0] === '*' ? list()
				: string !== '' ? p(string)
				: tag()
		)
	}

	function header() {
		let string = sourceCode[pointer]
		let index = 0
	
		counter()
	
		if(index === 0 || string[index] !== ' ' || string[index+1] === undefined) return p(string)
		let newString = string.slice(index+1, string.length)
		
		if(!newString) return p(newString)
	
		return h$(index, newString)
	

		function counter() {
			if(string[index] === ' ') return
			if(string[index] !== '#') return index = 0
			index++
			counter()
		}
	}
	function list() {
		let nestedlvl = 0
		let listTag = content()
		pointer--
		return listTag
		
		function content() {
			let newArr = []
			counter()
			return ul(newArr)

			function counter() {
				if(sourceCode[pointer] === undefined) return
				
				sourceCode[pointer][nestedlvl] === '\t' ? ifUl()
					: sourceCode[pointer].slice(nestedlvl, nestedlvl+2) === '* ' ? ifLi()
					: ''


				function ifUl() {
					nestedlvl++
					newArr.push(content())
				}
				function ifLi() {
					let string = sourceCode[pointer].slice(
						nestedlvl+2, 
						sourceCode[pointer].length
					)
					pointer++
					newArr.push(li(string))
					counter()
				}
			}
		}
	}
}



module.exports = lexer
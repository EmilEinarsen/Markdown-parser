const { tag, p, ul, ol, li, h$, pre, blockquote  } = require('./modules/tooken')

function lexer(sourceCode) {
	sourceCode = sourceCode.replace(/\r/g, '').split(/\n/g)

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
			/^\#/.test(string) ? header()
				: /^[*+-] /.test(string) ? list()
				: /^\d*\. /.test(string) ? list(true)
				: /^```/.test(string) ? codeBlock()
				: /^>/.test(string) ? quote()
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
	function list(orderd) {
		let regexp = orderd ? /^\d*\. / : /^[*+-] /
		let nestedlvl = 0
		let listTag = content()
		pointer--
		return listTag
		
		function content() {
			let newArr = []
			counter()
			return orderd ? ol(newArr) : ul(newArr)

			function counter() {
				let string = sourceCode[pointer]
				if(string === undefined) return
				
				string[nestedlvl] === '\t' ? ifUl()
					: regexp.test(string.slice(nestedlvl, string.length)) ? ifLi()
					: ''


				function ifUl() {
					nestedlvl++
					newArr.push(content())
				}
				function ifLi() {
					string = string.slice(
						nestedlvl+2, 
						string.length
					)
					pointer++
					newArr.push(li(string))
					counter()
				}
			}
		}
	}
	function codeBlock() {
		let array = []
		let index = 0
		let close = false
		while(!close) {
			index++
			if(/^```/.test(sourceCode[index+pointer])) close = true
			if(sourceCode.length < index+pointer) return pointer--
		}
		counter()

		return pre(p(array.join('\n')))


		function counter() {
			pointer++
			if(/^```/.test(sourceCode[pointer])) return
			array.push(sourceCode[pointer])
			counter()
		}
	}
	function quote() {
		let nestedlvl = 1
		let results = blockquote(content())
		pointer--
		return results


		function content() {
			let array = []
			let textNodes = []
			let listTag = false
			counter()
			return array


			function counter() {
				let string = sourceCode[pointer]
				if(string === '' || string === undefined || /^#/.test(string)) {
					if(textNodes) 
						if(listTag) array.push(ul(textNodes))
						else array.push(p(textNodes.join('')))
					return
				}
				let newString = string.slice(nestedlvl, string.length);

				/^\* /.test(newString) ? listTag = true
					: /^ \* /.test(newString) ? listTag = true
					: '';

				/^>/.test(newString) ? ifNested()
					: ifContent()

				function ifContent() {
					if(listTag) textNodes.push(li(newString.replace(/\*\s/g,'')))
					else textNodes.push(' '+string.replace(/>/g,''))
					pointer++
					counter()
				}
				function ifNested() {
					if(listTag) array.push(ul(textNodes))
					else array.push(p(textNodes.join('')))
					nestedlvl++
					array.push(blockquote(content()))
				}
			}
		}
	}
}


module.exports = lexer
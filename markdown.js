const lexer = require('./lexer/lexer')
const parser = require('./parser/parser')

const markdown = sourceCode => parser(lexer(sourceCode))

module.exports = markdown
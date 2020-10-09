const render = require('./modules/render')

const parser = (tookenList) => tookenList.map(tooken => render(tooken)).join('')

module.exports = parser
// externo
const minimist = require('minimist')

// interno
const soma = require('./soma').soma

const args = minimist(process.argv.slice(2))

const a = parseInt(args['a'] ? args['a'] : 0)
const b = parseInt(args['b'] ? args['b'] : 0)

soma(a, b)
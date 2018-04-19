var levelup = require('levelup')
var leveldown = require('leveldown')
var db = levelup(leveldown('db'), { valueEncoding: 'json' })

module.exports = db
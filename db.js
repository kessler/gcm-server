var config = require('./config')
var level = require('level')
var db = level(config.db, { valueEncoding: 'json' })

module.exports = db
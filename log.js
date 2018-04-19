const { Logger } = require('yalla')
const { logLevel } = require('./config')

module.exports = name => new Logger({ name, logLevel})
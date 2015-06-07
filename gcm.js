var gcm = require('node-gcm')
var config = require('./config.js')
var _ = require('lodash')
var sender = new gcm.Sender(config.gcm.key)

module.exports.push = function push (data, recipients, callback) {
	var info = _.cloneDeep(config.gcm.options)
	info.data = data

	var message = new gcm.Message(info)

	sender.send(message, recipients, 3, callback)
}
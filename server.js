const log = require('./log')('gcm-web-app')
var express = require('express')
var bodyParser = require('body-parser')
var _ = require('lodash')
var validator = require('validator')

var db = require('./db.js')
var gcm = require('./gcm.js')
var multilevel = require('./multilevel.js')
var config = require('./config.js')
var routes = require('./routes.js')

var app = express()

app.use('/healthprobe', routes.healthprobe())
app.use('/api/*', bodyParser.json())

app.use('/api/send', routes.validate(validator, false))
app.use('/api/send', routes.send(db, gcm))

// TODO this should be a PUT operation
app.use('/api/register', routes.validate(validator, true))
app.use('/api/register', routes.register(db))

app.use('/api/deregister', routes.validate(validator, false))
app.use('/api/deregister', routes.deregister(db))

app.listen(config.httpPort, function (err) {
	if (err) return console.error(err)

	log.info('lisening on port %d', config.httpPort)
})

var express = require('express')
var bodyParser = require('body-parser')
var _ = require('lodash')
var validator = require('validator')

var db = require('./db')
var gcm = require('./gcm')

var config = require('./config.js')
var routes = require('./routes.js')


var app = express()

app.use('/api/*', bodyParser.json())

app.use('/api/send', routes.validate(validator, false))
app.use('/api/send', routes.send(db, gcm))

// TODO this should be a PUT operation
app.use('/api/register', routes.validate(validator, true))
app.use('/api/register', routes.register(db))

app.listen(config.httpPort, function (err) {
	if (err) return console.error(err)

	console.log('lisening on port %d', config.httpPort)
})

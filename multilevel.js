var config = require('./config')
var multilevel = require('multilevel')
var net = require('net')
var db = require('./db')

net.createServer(function(con) {
	con.pipe(multilevel.server(db)).pipe(con)
}).listen(config.multilevelPort)

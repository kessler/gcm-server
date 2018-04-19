const multilevel = require('multilevel')
const net = require('net')
const pump = require('pump')
const log = require('./log')('remoteLevel')

// dangerous!
//const manifest = require('@reason/kiron-dish/manifest.json')

module.exports = details => {

	let db = multilevel.client()
	let con = net.connect(details.port, details.address)
	
	pump(con, db.createRpcStream(), con, err => {
		if (err) {
			log.error('error in multilevel stream', err)
			throw err
		}

		con.end()

		log.silly('remoteLevel stream finished')
	})

	con.setKeepAlive(true)

	con.once('connect', () => log.silly('remoteLevel connected'))

	return db
}

if (require.main === module) {
	let db = module.exports({ port: 9000, address: 'localhost' })
	db.createReadStream({ keyEncoding: 'string', valueEnconding: 'json' }).on('data', entry => console.log(entry.key.toString(), JSON.parse(entry.value)))
}
var rc = require('rc')

module.exports = rc('gcm-server', {
	httpPort: 3000,
	gcm: {
		key: '',
		googleProjectNumber: '',

		/* see https://github.com/ToothlessGear/node-gcm */
		options: {
			collapseKey: 'gcm-server',
			delayWhileIdle: true,
			timeToLive: 3
		}
	}
})
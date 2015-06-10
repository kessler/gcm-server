var rc = require('rc')

module.exports = rc('gcm-server', {
	httpPort: 3000,
	multilevelPort: 9000,
	gcm: {
		key: '',

		/* see https://github.com/ToothlessGear/node-gcm */
		options: {
			collapseKey: 'gcm-server',
			delayWhileIdle: true,
			timeToLive: 3
		}
	}
})
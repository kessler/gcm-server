var uuid = require('node-uuid')

module.exports.validate = function (validator, regIdRequired) {
	return function (req, res, next) {
		var handle = req.handle = req.query.handle || req.query.h || req.body.handle

		if (!handle) {
			return next(new Error('missing handle'))
		}

		if (!validator.isAlphanumeric(handle) || handle.length > 100) {
			return next(new Error('invalid handle'))
		}

		req.key = req.query.key || req.body.key

		var regid = req.regId = req.query.regid || req.body.regid

		if (regIdRequired && !regid) {
			return next(new Error('missing regid'))
		}

		if (regid && regid.length > 1000) {
			return next(new Error('invalid regid'))
		}
		
		next()
	}
}

/*
 * 	GET/PUT/POST 
 *	handle, regid
 */
module.exports.register = function (db) {
	return function (req, res, next) {
		console.log('registering %s / %s', req.handle, req.key)

		db.get(req.handle, function (err, registration) {
			if (err || registration.key === req.key) {
				var key = uuid();
				db.put(req.handle, { regId: req.regId, key: key }, function (err) {
					if (err) return next(err)

					res.end(key)
				})
			} else {
				next(new Error('handle already in use'))
			}
		})
	}
}

/*
 * 	GET/PUT/POST 
 *	mdata, handle
 */
module.exports.send = function (db, gcm) {
	return function (req, res, next) {
		var message = { message: req.query.m || req.body.m }

		// just sent to this regid
		var regid = req.regId
		
		if (regid) {
			return push(regid)
		}

		// TODO add support for many handles

		db.get(req.handle, function (err, data) {
			if (err) return next(err)
			console.log(data)

			push(data.regId)
		})

		function push (regId) {
			gcm.push(message, [regId], function (err, result) {
				if (err) return next(err)

				res.json(result)
			})
		}
	}
}

module.exports.healthprobe = function () {
	return function (req, res, next) {
		res.end()
	}
}
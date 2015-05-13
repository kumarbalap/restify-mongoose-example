var bunyan = require('bunyan');

var logger = bunyan.createLogger({
	name: 'myapp',
	streams: [
		{
			level: 'info',
			path: '/Users/webexp/bala/apps/logs/myapp-info.log'
		},
		{
			level: 'error',
			path: '/Users/webexp/bala/apps/logs/myapp-error.log'
		}
	]
});

module.exports = logger;
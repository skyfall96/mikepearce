module.exports = function(app) {
	return {
		getPort: function() {
			return process.env['PORT'] || 8081;
		},

		getAWSKey: function() {
			return process.env['AWS_SECRET'] || '';
		}
	};
};
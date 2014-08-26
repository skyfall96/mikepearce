module.exports = function(app) {
	return {
		getPort: function() {
			return process.env['PORT'] || 8080;
		},

		getAWSKey: function() {
			return process.env['AWS_SECRET'] || '';
		}
	};
};
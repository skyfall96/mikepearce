var MP = function(app) {
	return {
		getPort: function() {
			return process.env['PORT'] || 8080;
		}
	};
};

module.exports = MP;
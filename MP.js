module.exports = app => ({
	getPort: () => process.env['PORT'] || 8080
});

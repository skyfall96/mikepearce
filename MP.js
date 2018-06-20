module.exports = app => ({
	isLocalhost: () => !process.env.PORT,
	getPort: () => process.env.PORT || 8080
});

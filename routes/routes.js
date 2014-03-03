module.exports = function(app) {
	require('./views/viewRoutes')(app);
	require('./api/apiRoutes')(app);
};
module.exports = function(router) {
	require('./views/viewRoutes')(router);
	require('./api/apiRoutes')(router);
};

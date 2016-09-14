module.exports = router => {
	require('./views/viewRoutes')(router);
	require('./api/apiRoutes')(router);
};

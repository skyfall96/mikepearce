module.exports = function(app) {
	require('./views/views')(app);
	require('./api/api')(app);
};
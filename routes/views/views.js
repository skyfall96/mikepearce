module.exports = function(app) {
	var indexRoutes = require('./index.js');
	app.get('/', indexRoutes.index);
};
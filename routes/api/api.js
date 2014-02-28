module.exports = function(app) {
	var stockRoutes = require('./stock/stock.js');
	app.get('/api/stock', stockRoutes.viewStocks);
	app.get('/api/stock/save', stockRoutes.save);
};
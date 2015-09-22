module.exports = function(router) {
	var indexRoutes = require('./indexRoutes.js');
	router.get('/', indexRoutes.index);

	var stockViewRoutes = require('./stock/stockViewRoutes.js');
	router.get('/view/stock/view', stockViewRoutes.viewStocks);
	router.get('/view/stock/add', stockViewRoutes.addStock);
};

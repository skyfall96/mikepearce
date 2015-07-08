module.exports = function(app) {
	var indexRoutes = require('./indexRoutes.js');
	app.get('/', indexRoutes.index);

	var stockViewRoutes = require('./stock/stockViewRoutes.js');
	app.get('/view/stock/view', stockViewRoutes.viewStocks);
	app.get('/view/stock/add', stockViewRoutes.addStock);

	/* 404 */
	app.get('*', function(req, res){
	  res.render('/view/error/404', {
			title: 'Page Not Found'
		});
	});
};

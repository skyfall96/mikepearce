module.exports = function(app) {
	var awsRoutes = require('./AWS/awsRoutes');
	app.get('/api/aws/:asin/reviews', awsRoutes.getReviews);

	var stockRoutes = require('./stock/stockApiRoutes');
	app.get('/api/stock', stockRoutes.viewStocks);
	app.get('/api/stock/save', stockRoutes.saveStock);
};
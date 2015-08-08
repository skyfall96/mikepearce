module.exports = function(app) {
	var awsRoutes = require('./AWS/awsRoutes');
	var request = require('request');

	app.get('/api/aws/:asin/reviews', awsRoutes.getReviews);

	var stockRoutes = require('./stock/stockApiRoutes');
	app.get('/api/stock', stockRoutes.viewStocks);
	app.get('/api/stock/save', stockRoutes.saveStock);

	app.get('/api/background', function(req, res) {
		var image = require('../../modules/backgrounds/getRandomImage')(req, res);
		res.sendfile(image);
	});
};
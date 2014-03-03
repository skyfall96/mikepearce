exports.viewStocks = function(req, res) {
	res.render('stock/viewStocksView', {
		title: 'View Stocks in Portfolio'
	});
};

exports.addStock = function(req, res) {
	res.render('stock/addStockView', {
		title: 'Add a Stock Purchase to Portfolio'
	});
};
exports.getReviews = function(req, res) {
	require('../../../modules/aws/reviews')(req, res, req.params.asin);
};
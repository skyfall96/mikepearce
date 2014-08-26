module.exports = function(req, res, badgeReviews) {
	res.render('aws/formatReviews', { badgeReviews: badgeReviews });
};
module.exports = function(req, res, badgeReviews, timeStart, pages, reviewCount) {
	res.render('aws/formatReviews', {
		badgeReviews: badgeReviews,
		timeStart: timeStart,
		pages: pages
	});
};
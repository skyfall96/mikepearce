module.exports = function(req, res, badgeReviews, timeStart, pages, reviewCount) {
	if (reviewCount) {
		res.render('aws/formatReviews', {
			badgeReviews: badgeReviews,
			timeStart: timeStart,
			pages: pages
		});
	} else {
		res.send('NoResults');
		res.end();
	}
};
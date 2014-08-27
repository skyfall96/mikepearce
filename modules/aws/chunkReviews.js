module.exports = function(req, res, url, badgeReviews, timeStart) {
	var request = require('request');
	var cheerio = require('cheerio');
	var chunk = require('./chunkReviews');
	var format = require('./formatReviews');

	request(url, function (error, response, html) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);

			var $productReviews = $('#productReviews td > div');
			var nextPageUrl = getNextPageUrl($);

			$productReviews.each(function() {
				var $review = $(this);
				var $reviewerBadges = $review.find('a[target=AmazonHelp]');

				$reviewerBadges.each(function() {
					var badgeName = $(this).text().toLowerCase();

					if (badgeName === 'what\'s this?') { //verified purchase
						return;
					}

					if (!badgeReviews[badgeName]) {
						badgeReviews[badgeName] = { 
							reviews: [],
							stars: [],
							name: badgeName.replace('(', '').replace(')', '')
						};
					}

					badgeReviews[badgeName].stars.push(getStars($review));
					badgeReviews[badgeName].reviews.push($review.html());
				});
			});

			if (nextPageUrl && !isTimeToStop(timeStart)) {
				chunk(req, res, nextPageUrl, badgeReviews, timeStart)
			} else {
				format(req, res, badgeReviews);
			}
		}
	});

	function isTimeToStop(timeStart) {
		if ((new Date()) - timeStart < 20000) {
			return false;
		}

		return true;
	}

	function getStars($review) {
		var stars = getSwSpriteStars($review);

		if (!stars) {
			stars = getIconStars($review);
		}

		if (!stars) {
			return 0;
		}

		return stars;
	}

	function getSwSpriteStars($review) {
		var $stars = $review.find('.swSprite');
		var starsClasses = $stars.attr('class');
		
		if (starsClasses && starsClasses.length) {
			var classes = starsClasses.split(' ');
			
			if (classes.length >= 2) {
				return +classes[1].substr(7, 1);
			}
		}

		return 0;
	}

	function getIconStars($review) {
		var $stars = $review.find('.a-icon-star');
		var starsClasses = $stars.attr('class');
		
		if (starsClasses && starsClasses.length) {
			var classes = starsClasses.split(' ');
			
			if (classes.length >= 3) {
				return +classes[2].substr(-1);
			}
		}

		return 0;
	}

	function getNextPageUrl($) {
		var $lastUrl = $('.paging a').last();

		if ($lastUrl.text().indexOf('Next') >= 0) {
			return $lastUrl.attr('href');
		}

		return false;
	}
}
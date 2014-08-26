module.exports = function(req, res, url, badgeReviews) {
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
							name: badgeName.replace('(', '').replace(')', '')
						};
					}

					badgeReviews[badgeName].reviews.push($review.html());
				});
			});

			if (nextPageUrl) {
				chunk(req, res, nextPageUrl, badgeReviews)
			} else {
				format(req, res, badgeReviews);
			}
		}
	});

	function callback(badgeReviews) {
		res.json(badgeReviews);
		res.end();
	}

	function getNextPageUrl($) {
		var $lastUrl = $('.paging a').last();

		if ($lastUrl.text().indexOf('Next') >= 0) {
			return $lastUrl.attr('href');
		}

		return false;
	}
}

/*
TODO:
Have the main url for the reviews, need to:
	Get the set of reviews on each page
===>Need to figure out what to use to put a review into its respective buckets - potentially a review could be in multiple buckets as well, not going to worry about that right now, maybe only show reviews in each bucket at one time
	Need to figure out how to transport each review...html string?
	Need to figure out the rating
	Put each review in its appropriate bucket
	Go to next page, up to 5 pages to start, maybe 10 at the end
	Send the response back in JSON

With the response, write out the reviews
Have a checkbox for each review type
Use client side filtering to display each type of review or all of them

Figure out a way to monetize clicks
*/
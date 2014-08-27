module.exports = function(req, res, asin) {
	var aws = require('aws-lib');
	var http = require('http');
	var request = require('request');
	var cheerio = require('cheerio');
	var chunk = require('./chunkReviews');

	var associateTag = 'mikepea-20';
	var asin = asin;
	var iso8601Date = (new Date()).toISOString();
	var awsAccessKey = 'AKIAJLLD6JY5RQ5KJGMA';

	var badgeReviews = {};

	prodAdv = aws.createProdAdvClient(awsAccessKey, MP.getAWSKey(), associateTag);

	prodAdv.call("ItemLookup", {
		IdType: 'ASIN',
		ItemId: asin,
		ResponseGroup: 'Reviews',
		ContentType: 'text/html'
	}, function(err, result) {
		if (
			!result.Items ||
			!result.Items.Item ||
			!result.Items.Item.CustomerReviews ||
			!result.Items.Item.CustomerReviews.HasReviews
		) {
			console.error(result);
			return;
		}

		var url = result.Items.Item.CustomerReviews.IFrameURL;

		request(url, function (error, response, html) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(html);

				var allLinksUrl = $('.crAvgStars').find('a').attr('href');
				
				if (allLinksUrl) {
					chunk(req, res, allLinksUrl, badgeReviews, new Date(), 0);
				}
			}
		});
	});
}
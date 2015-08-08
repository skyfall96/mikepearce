module.exports = function() {
	var fs = require('fs');
	var path = require('path');
	var backgrounds = fs.readdirSync('./public/images/backgrounds');
	return path.join(__dirname, '../../public/images/backgrounds', backgrounds[Math.round(Math.random() * backgrounds.length)]);
};
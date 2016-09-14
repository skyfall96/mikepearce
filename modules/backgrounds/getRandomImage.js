let fs = require('fs');
let path = require('path');
let backgrounds = fs.readdirSync('./public/images/backgrounds');

module.exports = () => path.join(__dirname, '../../public/images/backgrounds', backgrounds[Math.round(Math.random() * backgrounds.length)]);

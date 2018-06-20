let fs = require('fs');
let path = require('path');
let browser = require('browser-detect');
let backgrounds = fs.readdirSync('./public/images/backgrounds');

module.exports = (req, res) => {
  const isChrome = browser(req.headers['user-agent']).name === 'chrome';
  const backgroundDirectory = isChrome ? '../../public/images/backgrounds-webp' : '../../public/images/backgrounds';
  const backgroundExtension = isChrome ? '.webp' : '.jpg';
  return path.join(__dirname, backgroundDirectory, backgrounds[Math.round(Math.random() * backgrounds.length)].replace('.jpg', backgroundExtension));
}

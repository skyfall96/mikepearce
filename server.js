const express = require('express');
const app = express();
const router = express.Router();
const helmet = require('helmet');
const express_enforces_ssl = require('express-enforces-ssl');
const http = require('http');
const path = require('path');
const autoprefixer = require('express-autoprefixer');
const compression = require('compression');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const static = require('serve-static');
const stylus = require('stylus');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');

global.MP = require('./MP')(app);
global._ = require('underscore')._;

if (!MP.isLocalhost()) {
	app.use(helmet());
	app.enable('trust proxy');
	app.use(express_enforces_ssl());
}
app.set(MP.getPort());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compression());
app.use(favicon(__dirname + '/public/images/m.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(autoprefixer({ browsers: 'last 2 versions', cascade: false }));
app.use(static('/public/stylesheets'));
app.use(static(path.join(__dirname, 'public')));
app.use(stylus.middleware(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
	app.use(errorHandler());
}

require('./routes/routes')(router);

app.use('/', router);

app.use((req, res) => {
	res.status(404).render('error/404', {
		title: 'Page Not Found'
	});
});

let server = http
	.createServer(app)
	.listen(MP.getPort(), () => console.log('Express server listening on port ' + MP.getPort()));

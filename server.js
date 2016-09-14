let express = require('express');
let app = express();
let router = express.Router();
let http = require('http');
let path = require('path');
let autoprefixer = require('express-autoprefixer');
let compression = require('compression');
let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');
let static = require('serve-static');
let stylus = require('stylus');
let methodOverride = require('method-override');
let errorHandler = require('errorhandler');

global.MP = require('./MP')(app);
global._ = require('underscore')._;

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

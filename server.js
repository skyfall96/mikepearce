var express = require('express');
var app = express();
var router = express.Router();
var http = require('http');
var path = require('path');
var autoprefixer = require('express-autoprefixer');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var static = require('serve-static');
var stylus = require('stylus');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

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

if ('development' == app.get('env')) {
	app.use(errorHandler());
}

require('./routes/routes')(router);
app.use('/', router);

app.use(function(req, res) {
	res.status(404).render('error/404', {
		title: 'Page Not Found'
	});
});

var server = http.createServer(app).listen(MP.getPort(), function(){
	console.log('Express server listening on port ' + MP.getPort());
});

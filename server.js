var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var autoprefixer = require('express-autoprefixer');
var cssRoot = '/public/stylesheets';

global.MP = require('./MP')(app);
global._ = require('underscore')._;

app.set(MP.getPort());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.compress());
app.use(express.staticCache());
app.use(express.favicon(__dirname + '/public/images/m.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(autoprefixer({ browsers: 'last 2 versions', cascade: false }));
app.use(express.static(cssRoot));
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res) {
	res.status(404).render('error/404', {
		title: 'Page Not Found'
	});
});

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

require('./routes/routes')(app);

var server = http.createServer(app).listen(MP.getPort(), function(){
	console.log('Express server listening on port ' + MP.getPort());
});

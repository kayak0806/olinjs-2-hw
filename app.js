
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , Cat = require('./models/cat')
  , cat = require('./routes/cat')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/cats', cat.list);
app.get('/cats/new', cat.create);
app.get('/cats/delete/old',cat.remove);
app.get('/cats/color/:color',cat.color);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

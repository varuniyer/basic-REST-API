var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	Content = require('./api/models/ciscoApiModel'),
	bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('https://obscure-beach-76422.herokuapp.com/content');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/ciscoApiRoutes');
routes(app);

app.listen(port);
console.log('API Server started on: ' + port);

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

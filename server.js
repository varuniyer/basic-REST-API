var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	Content = require('./api/models/apiModel'),
	bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://heroku_nqrlcwbq:5v66ofjoephg0pc7eina6tt40q@ds161194.mlab.com:61194/heroku_nqrlcwbq');
mongoose.connect('mongodb://localhost/Contentdb');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/apiRoutes');
routes(app);

app.listen(port);
console.log('API Server started on: ' + port);

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

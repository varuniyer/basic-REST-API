'use strict';

var mongoose = require('mongoose'),
	Content = mongoose.model('Content');

exports.list_all_content = function(req, res) {
	Content.find({}, function(err, content) {
		if(err) res.send(err);
		res.json(content);
	});
};

exports.create_content = function(req, res) {
	var new_content = new Content(req.body);
	new_content.save(function(err, content) {
		if(err) res.send(err);
		res.json(content);
	});
};

exports.read_content = function(req, res) {
	Content.findById(req.params.contentId, function(err, content) {
		if(err) res.send(err);
		res.json(content);
	});
};

exports.update_content = function(req, res) {
	Content.findOneAndUpdate({_id: req.params.contentId}, req.body, {new: true}, function(err, content) {
		if(err) res.send(err);
		res.json(content);
	});
};

exports.delete_content = function(req, res) {
	Content.remove({_id: req.params.contentId}, function(err, content) {
		if(err) res.send(err);
		res.json(content);
	});
}

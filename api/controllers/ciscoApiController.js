'use strict';

var mongoose = require('mongoose'),
	Content = mongoose.model('Content');

//var url = 'localhost:3000';
var url = 'https://obscure-beach-76422.herokuapp.com';

exports.list_all_content = function(req, res) {
	var list = [];
	Content.find({}, function(err, content) {
		if(err) res.json({
			"verb": "GET",
			"url": url + "/objects/",
			"message": err.toString()
		});
		for(var i = 0; i < content.length; i++) list.push({'url': url + '/objects/' + content[i]._id.toString()});
		res.json(list);
	});
};

exports.create_content = function(req, res) {
	var new_content = new Content(req.body);
	console.log(req.body);
	new_content.save(function(err, content) {
		if(err) res.json({
			"verb": "POST",
			"url": url + "/objects/",
			"message": err.toString()
		});
		res.json(content);
	});
};

exports.read_content = function(req, res) {
	Content.findById({_id: req.params.contentId}, function(err, content) {
		if(err) res.json({
			"verb": "GET",
			"url": url + "/objects/" + req.params.contentId,
			"message": err.toString()
		});
		else if(content == null) res.json({
			"verb": "GET",
			"url": url + "/objects/" + req.params.contentId,
			"message": "No Such Element"
		});
		else res.json(content);
	});
};

exports.update_content = function(req, res) {
	var removals = {};
	Content.findOneAndUpdate({_id: req.params.contentId}, req.body, {new: true}, function(err, content) {
		if(err) res.json({
			"verb": "PUT",
			"url": url + "/objects/" + req.params.contentId,
			"message": err.toString()
		});
		else if(content == null) res.json({
			"verb": "PUT",
			"url": url + "/objects/" + req.params.contentId,
			"message": "No Such Element"
		});
		else {
			Object.keys(content._doc).forEach(function(key) {
				//If request doesn't have key remove it
				console.log(key + " " + content._doc[key]);
				if(!(key == '_id' || key == '__v' || req.body.hasOwnProperty(key))) {
					removals[key] = content._doc[key];
					delete content._doc[key];
				}
			});
			Content.update({_id: req.params.contentId}, {$unset: removals}, {new: true}, function(err, content) {});
			res.json(content);
		}
	});
};

exports.delete_content = function(req, res) {
	Content.remove({_id: req.params.contentId}, function(err, content) {
		if(err) res.json({
			"verb": "DELETE",
			"url": url + "/objects/" + req.params.contentId,
			"message": err.toString()
		});
		else if(content.result.n == 0) res.json({
			"verb": "DELETE",
			"url": url + "/objects/" + req.params.contentId,
			"message": "No Such Element"
		});
		else
			res.json();
	});
}

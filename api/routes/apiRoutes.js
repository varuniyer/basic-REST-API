'use strict';
module.exports = function(app) {
	var content = require('../controllers/apiController');

	app.route('/objects').get(content.list_all_content).post(content.create_content);
	app.route('/objects/:contentId').get(content.read_content).put(content.update_content).delete(content.delete_content);
}

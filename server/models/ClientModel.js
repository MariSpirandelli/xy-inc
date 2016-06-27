var mongoose = require('mongoose');

var ClientModelSchema = new mongoose.Schema({
	client_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
  	model_name: String,
	model_attributes: {type: Object},
  	updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ClientModel', ClientModelSchema);
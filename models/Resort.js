const mongoose = require('mongoose');

const { Schema } = mongoose;

const resortSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	latitude: Number,
	longitude: Number,
});

const Resort = mongoose.model('Resort', resortSchema);

module.exports = Resort;

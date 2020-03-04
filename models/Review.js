const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
	resort_id: { type: Schema.Types.ObjectId, ref: 'Resort' },
	text: String,
	author: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

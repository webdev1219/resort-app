/* eslint-disable no-underscore-dangle */
const express = require('express');
const Resort = require('../models/Resort');
const Review = require('../models/Review');

const router = express.Router();

/* GET /resorts */
router.get('/', (req, res, next) => {
	Resort.find()
		.then(resorts => {
			res.render('resorts/list', {
				resorts,
			});
		})
		.catch(next);
});
// GET /resorts/add
router.get('/add', (req, res) => {
	res.render('resorts/create');
});

// POST /resorts
router.post('/', (req, res, next) => {
	const { name, latitude, longitude } = req.body;
	Resort.create({
		name,
		latitude: parseFloat(latitude),
		longitude: parseFloat(longitude),
	})
		.then(() => {
			res.redirect('/resorts');
		})
		.catch(next);
});

// POST /resorts/:id/delete
router.post('/:id/delete', (req, res, next) => {
	const { id } = req.params;

	Resort.findByIdAndDelete(id)
		.then(() => {
			res.redirect('/resorts');
		})
		.catch(next);
});

// GET /resorts/:params/update?query=valor
router.get('/:id/update', (req, res, next) => {
	const { id } = req.params;
	let resort;
	// Resort.findById(id)
	// 	.then(foundResort => {
	// 		resort = foundResort;
	// 		return Review.find({ resort_id: foundResort._id });
	// 	})
	// 	.then(reviews => {
	// 		res.render('resorts/update', { resort, reviews });
	// 	})
	// 	.catch(error => {
	// 		next(error);
	// 	});
	Review.find({ resort_id: id })
		.populate('resort_id')
		.then(reviews => {
			const { resort_id: resort } = reviews[0];
			res.render('resorts/update', { resort, reviews });
		})
		.catch(next);
});

// POST /resorts/:id
router.post('/:id', (req, res, next) => {
	const { id } = req.params;
	const { name, latitude, longitude } = req.body;
	Resort.findByIdAndUpdate(id, {
		name,
		latitude,
		longitude,
	})
		.then(resortUpdated => {
			res.redirect('/resorts');
		})
		.catch(next);
});

// POST /resorts/:id/review
router.post('/:id/review', (req, res, next) => {
	const { id } = req.params;
	const { author, text } = req.body;
	Review.create({
		resort_id: id,
		author,
		text,
	})
		.then(() => {
			res.redirect(`/resorts/${id}/update`);
		})
		.catch(next);
});

module.exports = router;

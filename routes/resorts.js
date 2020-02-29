const express = require('express');
const Resort = require('../models/Resort');

const router = express.Router();

/* GET resorts listing. */
router.get('/', (req, res, next) => {
	Resort.find()
		.then(resorts => {
			res.render('resorts/list', {
				resorts,
			});
		})
		.catch(next);
});

router.get('/add', (req, res) => {
	res.render('resorts/create');
});

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

router.post('/:id/delete', (req, res, next) => {
	const { id } = req.params;

	Resort.findByIdAndDelete(id)
		.then(() => {
			res.redirect('/resorts');
		})
		.catch(next);
});

module.exports = router;

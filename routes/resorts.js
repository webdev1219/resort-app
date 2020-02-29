const express = require('express');
const Resort = require('../models/Resort');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
	Resort.find()
		.then(resorts => {
			console.log('resorts', resorts);
			res.render('resorts/list', {
				resorts,
			});
		})
		.catch(() => {});
});

module.exports = router;

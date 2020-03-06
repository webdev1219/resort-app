const express = require('express');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Express' });
});

module.exports = router;

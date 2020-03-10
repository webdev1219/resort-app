const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();
const saltRounds = 10;

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Express' });
});

router.get('/signup', (req, res, next) => {
	res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
	const { username, password } = req.body;
	if (username === '' || password === '') {
		res.render('auth/signup', { error: 'no pueden estar vacios' });
	} else {
		User.findOne({ username })
			.then(user => {
				if (user) {
					res.render('auth/signup', { error: 'nombre de usuario ya existe' });
				} else {
					const salt = bcrypt.genSaltSync(saltRounds);
					const hashedPassword = bcrypt.hashSync(password, salt);
					User.create({
						username,
						hashedPassword,
					})
						.then(userCreated => {
							req.session.currentUser = userCreated;
							res.redirect('/resorts');
						})
						.catch(error => {
							console.log('error', error);
							next(error);
						});
				}
			})
			.catch(error => {
				next(error);
			});
	}
});

router.get('/login', (req, res, next) => {
	res.render('auth/login', { error: req.flash('error') });
});

router.post('/login', (req, res, next) => {
	const { username, password } = req.body;
	if (username === '' || password === '') {
		req.flash('error', 'no pueden estar vacios');
		res.redirect('/login');
	} else {
		User.findOne({ username })
			.then(user => {
				if (!user) {
					req.flash('error', 'no estas registrado');
					res.redirect('/login');
				} else {
					console.log(bcrypt.compareSync(password, user.hashedPassword));
					if (bcrypt.compareSync(password, user.hashedPassword)) {
						req.session.currentUser = user;
						req.flash('info', 'welcome !!!!!');
						res.redirect('/resorts');
					} else {
						req.flash('error', 'usuario o contraseña incorrectos');
						res.redirect('/login');
					}
				}
			})
			.catch(error => {
				next(error);
			});
	}
});

router.get('/logout', (req, res, next) => {
	req.session.destroy(err => {
		if (err) {
			next(err);
		}
		res.redirect('/login');
	});
});

module.exports = router;

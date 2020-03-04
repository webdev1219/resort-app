const mongoose = require('mongoose');
require('dotenv').config();

const dbPath = 'mongodb://localhost:27017/resorts-app';

mongoose
	.connect(dbPath, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log(`conected to ${dbPath}`);
	})
	.catch(error => {
		console.error(error);
	});

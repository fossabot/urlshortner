'use strict';

const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route	GET /
// @desc	Index Page
router.get('/', async (req, res, next) => {
	try {
		const url = await Url.find().lean();
		res.render('index', {
			title: 'URL Shortner',
			url,
		});
	}
	catch (err) {
		console.error(err.message);
		res.redirect('/error/500');
	}
});

// @route	GET /:code
// @desc	Redirect to long/original URL
router.get('/:code', async (req, res, next) => {
	try	{
		const url = await Url.findOne({ urlCode: req.params.code });

		if (url) {
			return res.redirect(url.longUrl);
		}
		else {
			return res.status(404).json('No URL Found!');
		}
	}
	catch (err) {
		console.error(err);
		res.status(500).json('Server Error');
	}
});

// @route	GET /error/500
// @desc 	Error 500 page
router.get('/error/500', (req, res, next) => {
	res.render('errors/500', {
		title: 'Error 500',
	});
});

module.exports = router;
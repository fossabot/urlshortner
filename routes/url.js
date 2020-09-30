'use strict';

const config = require('../config/config');
const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');

const Url = require('../models/Url');

// @route   POST /api/url/shorten
// @desc    Create short Url
router.post('/shorten', async (req, res, next) => {
	const { longUrl } = req.body;
	const baseUrl = config.baseURL;

	// Check if baseUrl is valid
	if (!validUrl.isUri(baseUrl)) {
		return res.status(401).json('Invalid base url');
	}

	// Create url code
	const urlCode = shortId.generate();

	// Check if longUrl is valid
	if (validUrl.isUri(longUrl)) {
		try {
			let url = await Url.findOne({ longUrl });

			if (url) {
				res.redirect('/');
			}
			else {
				const shortUrl = baseUrl + '/' + urlCode;

				url = new Url({
					longUrl,
					shortUrl,
					urlCode,
					date: new Date(),
				});

				await url.save();

				res.redirect('/');
			}
		}
		catch (err) {
			console.error(err);
			res.redirect('error/500');
		}
	}
});

// @desc	Deletes a URL entry
// @route	DELETE /api/url/delete/:code
router.delete('/delete/:code', async (req, res, next) => {
	try	{
		await Url.remove({
			urlCode: req.params.code,
		});
		res.redirect('/');
	}
	catch (err) {
		console.error(err);
		return res.redirect('/error/500');
	}
});

module.exports = router;
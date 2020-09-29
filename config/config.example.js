'use strict';

module.exports = {
	/*
    * The baseURL is what the software uses to redirect to the original URL.
    * This would be in theory your domain name, feel free to use any you like.
    */
	baseURL: 'http://localhost:5000',

	// Port on which to run the server on
	port: process.env.PORT || 5000,

	/*
    * Currently this software only supports MongoDB Atlas so here you would need to add the URI to your cluster
    */
	mongoURI: '',
};
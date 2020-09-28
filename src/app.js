'use strict';

const config = require('../config/config');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');

const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.listen(config.port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${config.port}`));
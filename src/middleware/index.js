const express = require('express');

// Middleware for logging request details
function logReqDetails(req, res, next) {
    console.log(`Received a ${req.method} request from ${req.ip} for ${req.url}`);
    next();
}

// Middleware for validating Share symbol
function validateShareSymbol(req, res, next) {
    const symbol = req.params.symbol;
    if (!symbol || symbol.length !== 3 || symbol.toUpperCase() !== symbol) {
        res.status(400).json({ message: 'Invalid Share Symbol.' });
    } else {
        next();
    }
}

// Middleware for validating Portfolio
function validatePortfolio(req, res, next) {
    // assuming portfolio id is passed in params
    const portfolioId = req.params.portfolioId;
    // Add your validation logic here. If the portfolio is not valid send the response with error message
    // otherwise call the next() function
}

// Error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send('Internal Server Error');
}

module.exports = {
    logReqDetails,
    validateShareSymbol,
    validatePortfolio,
    errorHandler
}

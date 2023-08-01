const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const { logReqDetails, validateShareSymbol, validatePortfolio, errorHandler } = require('./middleware');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logReqDetails);
app.use('/shares/:symbol', validateShareSymbol);
app.use('/portfolio/:portfolioId', validatePortfolio);
app.use(errorHandler);

// Use Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Sync database and then start the server
const db = require('./models');
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

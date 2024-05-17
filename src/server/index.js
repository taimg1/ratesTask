
require('dotenv').config();
const express = require('express');
const connectToDatabase = require('./config/dbconfig');
const exchangeRatesRoutes = require('./routes/ExchangeRates');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');


(async () => {
  try {
    const sequelize = await connectToDatabase();
    console.log('Database connected successfully');
    app.use(cors());
    app.use((req, res, next) => {
      res.setHeader("Content-Security-Policy", "default-src 'none'; img-src 'self' http://localhost:5001;");
      next();
    });

    app.use('/api', exchangeRatesRoutes);
    app.get('/', (req, res) => {
      res.send('Hello world!');
    });

    app.listen(port, () => console.log(`Server is running at http://localhost:${port} ${new Date().toISOString()}`));

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
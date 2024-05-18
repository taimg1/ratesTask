const express = require('express');
const axios = require('axios');
const getExchangeRateModel = require('../models/rates'); // Change this line
const connectToDatabase = require('../config/dbconfig');
const router = express.Router();

const options = {
  method: 'GET',
  url: process.env.API_URL,
  params: {base: process.env.API_BASE},
  headers: {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': process.env.API_HOST
  }
};

async function fetchAndSaveExchangeRates() {
  const sequelize = await connectToDatabase();
  const ExchangeRate = getExchangeRateModel(sequelize);

  try {
    const response = await axios.request(options);
    const rates = response.data.rates;
    let usdRate = rates.USD;
    let eurRate = rates.EUR;
    usdRate  = 1 / usdRate;
    eurRate = 1 / eurRate;

    await ExchangeRate.create({ rate_date: rates.time_utc, currency: 'USD', rate: usdRate });
    await ExchangeRate.create({ rate_date: new Date(), currency: 'EUR', rate: eurRate });

  } catch (error) {
    console.log("many requests");
  }
}

setInterval(fetchAndSaveExchangeRates, 60000);

router.get('/getExchangeRates', async (req, res) => {
  const sequelize = await connectToDatabase();
  const ExchangeRate = getExchangeRateModel(sequelize);
  const exchangeRates = await ExchangeRate.findAll();
  res.json(exchangeRates);
  console.log(Date.now() + ' - Exchange rates were sent to the client');
});

module.exports = router;
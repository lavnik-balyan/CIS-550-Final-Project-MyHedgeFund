const express = require('express');
const mysql      = require('mysql');

const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*'
}));

// Routes for 550 FINAL PROJECT

//home page
app.get('/', routes.home)

// Ticker Route - register as GET
app.get('/tickerFundamentals/:tick', routes.tickerFundamentals)
app.get('/tickerCompetitors/:tick', routes.tickerCompetitors)
app.get('/tickerNews/:tick', routes.tickerNews)
app.get('/tickerInsider/:tick', routes.tickerInsider)
app.get('/tickerETF/:tick', routes.tickerETF)

app.get('/comparingCompanies/:sector/:tick1/:tick2/:year', routes.comparingCompanies)

//Sector Route - Register as GET  
//NOTE spaces in the sector parameter will be specified with %20 so Health Care should be entered into the URL 
//as Health%20Care - this will be important when managing client side string search entries. 
app.get('/sector/:sector/:year', routes.sector)

//MostGrossing Route - Register as GET
app.get('/mostGrossing/:year', routes.MostGrossing)

//Operating Costs vs Taxes Route - Register as GET
app.get('/opVsTax/:year1/:year2', routes.OpVsTax)

//Percent Profit Increase Route - Register as GET
app.get('/profitGrowthPercentage/:year1/:year2', routes.ProfitGrowthPercentage)

//Pretax Income vs Taxes Paid Route - Register as GET
app.get('/pretaxVsTaxes/:year1/:year2', routes.PreTaxVsTaxes)


app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;

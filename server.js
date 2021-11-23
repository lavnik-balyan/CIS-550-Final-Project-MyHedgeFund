const express = require('express');
const mysql      = require('mysql');


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// Route 1 - register as GET 
app.get('/hello', routes.hello)

// Route 2 - register as GET 
app.get('/jersey/:choice', routes.jersey)

// Route 3 - register as GET 
app.get('/matches/:league', routes.all_matches)

// Route 4 - register as GET 
app.get('/players', routes.all_players)

// Route 5 - register as GET 
app.get('/match', routes.match)

// Route 6 - register as GET 
app.get('/player', routes.player)

// Route 7 - register as GET 
app.get('/search/matches', routes.search_matches)

// Route 8 - register as GET 
app.get('/search/players', routes.search_players)


//HERE STARTS THE CODE FOR THE 550 FINAL PROJECT

//home page
app.get('/', routes.home)

/// STUFF FOR PAGE 1
// Ticker Route - register as GET
app.get('/tickerFundamentals/:tick', routes.tickerFundamentals)
app.get('/tickerCompetitors/:tick', routes.tickerCompetitors)
app.get('/tickerNews/:tick', routes.tickerNews)
app.get('/tickerInsider/:tick', routes.tickerInsider)
app.get('/tickerETF/:tick', routes.tickerETF)

/// STUFF FOR PAGER 2
app.get('/comparingCompanies/:sector/:tick1/:tick2/:year', routes.comparingCompanies)


//Sector Route - Register as GET  
//NOTE spaces in the sector parameter will be specified with %20 so Health Care should be entered into the URL 
//as Health%20Care - this will be important when managing client side string search entries. 
app.get('/sector/:sector/:year', routes.sector)

//MostGrossing Route - Register as GET
app.get('/MostGrossing/:year', routes.MostGrossing)

//Operating Costs vs Taxes Route - Register as GET
app.get('/OpVsTax/:year1/:year2', routes.OpVsTax)

//Percent Profit Increase Route - Register as GET
app.get('/ProfitGrowthPercentage/:year1/:year2', routes.ProfitGrowthPercentage)

//Pretax Income vs Taxes Paid Route - Register as GET
app.get('/PretaxVsTaxes/:year1/:year2', routes.PreTaxVsTaxes)


app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;

const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


// ************************************************************************
//            THESE ARE THE ROUTES FOR THE 550 FINAL PROJECT
// ************************************************************************

//BEGIN DECLARATION OF TICKER ROUTE FOR THE HOME PAGE
async function home(req, res) {
    // a GET request to /hello?name=Steve
        res.send(`This is the home page response for the 550 final project`)  
}


//This route will give the financial and company info for a (required) specified ticker for all years available
//if the optional year query is provided, it will only return the financial information for that year /tickerFundamentals/TSLA
async function tickerFundamentals(req, res) {   
    
    if (req.query.year && !isNaN(req.query.year)){
        connection.query(`SELECT *
        FROM Companies c 
        JOIN Financials f ON c.Ticker = f.Ticker
        WHERE c.Ticker = '${req.params.tick}' AND f.Year = '${req.query.year}'` , function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }

    else{connection.query(`SELECT *
        FROM Companies c 
        JOIN Financials f ON c.Ticker = f.Ticker
        WHERE c.Ticker = '${req.params.tick}'
        ORDER BY f.Year DESC`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    }
}


/////~~~~~~~~~~~~~~ FIND TOP 10 COMPETITORS OF THIS TICKER SYMBOL BY TOTAL REVENUE  ~~~~~~~~~~~~~~///// /tickerCompetitors/TSLA
async function tickerCompetitors(req, res) {   
    
    connection.query(`
        WITH allcompetitors AS (
            SELECT Comps.Ticker
            FROM Companies Comps
            WHERE Comps.Sector = (SELECT C.Sector
                FROM Companies C
                WHERE C.Ticker = '${req.params.tick}') and Comps.Ticker <> '${req.params.tick}'
        )
        SELECT AC.Ticker
        FROM allcompetitors AC
        JOIN Financials F ON AC.Ticker = F.Ticker
        GROUP BY AC.Ticker
        ORDER BY  MAX(F.Total_Revenue) DESC
        LIMIT 10;` , function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

/////~~~~~~~~~~~~~~ FIND CURRENT NEWS  ~~~~~~~~~~~~~~///// /tickerNews/TSLA
async function tickerNews(req, res) {   
    
    connection.query(`
        SELECT CA.Headline, CA.ArticleLink
        FROM Companies C
        JOIN CurrentAffairs CA on C.Ticker = CA.Ticker
        WHERE C.Ticker = '${req.params.tick}'` , function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

/////~~~~~~~~~~~~~~ FIND INSIDER TRADING  ~~~~~~~~~~~~~~///// /tickerInsider/TSLA
async function tickerInsider(req, res) {   
    
    connection.query(`
        SELECT C.Ticker, I.FillingDate, I.InsiderName, I.Title, I.Type, I.Price, I.Quantity, I.Owned, I.Value
        FROM Companies C
        JOIN Insider I on C.Ticker = I.Ticker
        WHERE C.Ticker = '${req.params.tick}'` , function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}


/////~~~~~~~~~~~~~~ FIND ETF invovlement  ~~~~~~~~~~~~~~///// /tickerETF/TSLA
async function tickerETF(req, res) {   
    
    connection.query(`
        SELECT C.Ticker, etf.ETFTicker, etf.ETFName, etf.Category, etf.ExpenseRatio, etf.Weightage
        FROM Companies C
        JOIN ETFExposure etf on C.Ticker = etf.Ticker
        WHERE C.Ticker = '${req.params.tick}'` , function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}


/////~~~ Page 2 Comparing companies ~~~~~/// EX: /comparingCompanies/Health%20Care/ABT/CVS/2021
async function comparingCompanies(req, res) {   
    
    connection.query(`WITH industrySelect AS (
        SELECT *
        FROM Companies C
        WHERE C.Sector = '${req.params.sector}'
    ),
    companiesSelect AS (
        SELECT IC.Ticker
        FROM industrySelect IC
        WHERE IC.Ticker = '${req.params.tick1}' or IC.Ticker = '${req.params.tick2}'
        )
    SELECT CS.Ticker, F.Year, F.Total_Revenue, F.Cost_Of_Revenue, F.Gross_Profit, F.Operating_Expense, F.Operating_Income
    FROM companiesSelect CS
    JOIN Financials F ON F.Ticker = CS.Ticker
    WHERE F.Year = '${req.params.year}'` , function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}








//This route will return financial information for all of the companies in a given sector in a given year
async function sector(req, res) {   
    
    connection.query(`SELECT *
    FROM Companies c JOIN Financials f ON c.Ticker = f.Ticker
    WHERE c.Sector = '${req.params.sector}' AND f.Year = '${req.params.year}'
    ORDER BY c.Ticker ASC`, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });

    
}

//this route will return information about the top 10 most succsesful companies in a given year in an (optional) given industry
//if desired, these results can be restricted to companies who experienced gross profit within only an (optional) specified range 
async function MostGrossing(req, res) {   
    const sector = req.query.sector ? req.query.sector: ""
    const grossLow = req.query.grossLow ? req.query.grossLow: 0
    const grossHigh = req.query.grossHigh ? req.query.grossHigh: Infinity
    connection.query(`SELECT DISTINCT c.Ticker, c.Name, c.Sector, f.Gross_Profit, f.Year
    FROM Financials f JOIN Companies c ON f.Ticker = c.Ticker
    WHERE f.Year = '${req.params.year}' AND c.Sector LIKE '%${sector}%' AND f.Gross_Profit < ${grossHigh} AND f.Gross_Profit > ${grossLow}
    ORDER BY f.Gross_Profit DESC
    LIMIT 10;
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });

    
}

//this route will return the percentage of companies that experienced an increase in operating cost and who experienced
// an increase in gross profit that was more than their increase in operating expense
async function OpVsTax(req, res) {   
    const sector = req.query.sector ? req.query.sector: ""
    connection.query(`WITH year2019 AS (SELECT c.Ticker, Operating_Expense, Gross_Profit
                            FROM Financials f JOIN Companies c ON f.Ticker = c.ticker
                            WHERE Year = ${req.params.year1} AND Sector LIKE '%${sector}%'),
                    year2020 AS (SELECT c.Ticker, Operating_Expense, Gross_Profit
                            FROM Financials f JOIN Companies c ON f.Ticker = c.ticker
                            WHERE Year = ${req.params.year2} AND Sector LIKE '%${sector}%'), 

                    Satisfy AS (SELECT Count(*) AS Count
                            FROM year2019 n JOIN year2020 t ON n.Ticker = t.Ticker
                            WHERE (t.Operating_Expense - n.Operating_Expense) > 0 AND (t.Gross_Profit - n.Gross_Profit) > (t.Operating_Expense - n.Operating_Expense)),

                    Total AS (SELECT Count(*) AS Count FROM year2019 n JOIN year2020 t ON n.Ticker = t.Ticker)

SELECT (s.Count / t.Count)*100 AS Percentage 
FROM Satisfy s, Total t

    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });

    
}

//This  route will return information about companies that experienced percent increases in a certain range in gross profits 
//between two years. The results can be filtered by sector if desired. 
async function ProfitGrowthPercentage(req, res) {   
    const sector = req.query.sector ? req.query.sector: ""
    const percentLow = req.query.percentLow ? req.query.percentLow: 0
    const percentHigh = req.query.percentHigh ? req.query.percentHigh: 1000

    connection.query(`WITH year2 AS (
        SELECT F.Ticker, F.Year, F.Gross_Profit
        FROM Financials F
        WHERE F.Year = ${req.params.year2}
    ),
    
    year1 AS (
        SELECT F.Ticker, F.Year, F.Gross_Profit
        FROM Financials F
        WHERE F.Year = ${req.params.year1}
    ),
    
    growthcalc AS (
        SELECT year2.Ticker AS TICKER, (((year2.Gross_Profit - year1.Gross_Profit) / year1.Gross_Profit) * 100) AS GROWTHRATE
        FROM year2
        JOIN year1 ON year2.Ticker = year1.Ticker
    )
    
    SELECT G.TICKER, C.Name, G.GROWTHRATE
    FROM growthcalc G
    JOIN Companies C ON G.TICKER = C.Ticker
    WHERE C.Sector LIKE '%${sector}%' AND G.GROWTHRATE > ${percentLow} AND G.GROWTHRATE < ${percentHigh}
    ORDER BY G.GROWTHRATE DESC
    
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });

}

//this route takes in two years and an optional sector and returns the companies who experienced a percentage increase in 
//Pretax income that was larger than their precentage increase in taxes paid across the two years
async function PreTaxVsTaxes(req, res) {   
    const sector = req.query.sector ? req.query.sector: ""
    connection.query(`WITH 1year AS (SELECT f.Ticker, PreTax_Income, Tax_Provision
                        FROM Financials f JOIN Companies c ON f.Ticker = c.Ticker
                        WHERE Year = ${req.params.year1} AND Sector LIKE '%${sector}%'),
                    2year AS (SELECT f.Ticker, PreTax_Income, Tax_Provision
                        FROM Financials f JOIN Companies c ON f.Ticker = c.Ticker
                        WHERE Year = ${req.params.year2} AND Sector LIKE '%${sector}%')

            SELECT e.Ticker AS Ticker, (n.Tax_Provision - e.Tax_Provision) / e.Tax_Provision *100 AS TaxProvisionIncreasePercentage, (n.PreTax_Income - e.PreTax_Income)/e.PreTax_Income*100  AS PreTaxIncomeIncreasePercentage
            FROM 1year e JOIN 2year n ON e.Ticker = n.Ticker
            WHERE (n.Tax_Provision - e.Tax_Provision) / e.Tax_Provision < (n.PreTax_Income - e.PreTax_Income)/e.PreTax_Income 
            ORDER BY Ticker ASC

    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });

    
}

module.exports = {
    home,
    tickerFundamentals, 
    tickerCompetitors,
    tickerNews,
    tickerInsider,
    tickerETF,
    comparingCompanies,
    sector, 
    MostGrossing, 
    OpVsTax, 
    ProfitGrowthPercentage, 
    PreTaxVsTaxes
}

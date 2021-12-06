import config from './config.json'

const tickerFundamentals = async (tick, year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/tickerFundamentals/${tick}?year=${year}`, {
        method: 'GET',
    })
    return res.json()
}

const tickerCompetitors = async (tick) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/tickerCompetitors/${tick}`, {
        method: 'GET',
    })
    return res.json()
}

const tickerNews = async (tick) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/tickerNews/${tick}`, {
        method: 'GET',
    })
    return res.json()
}

const tickerInsider = async (tick) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/tickerInsider/${tick}`, {
        method: 'GET',
    })
    return res.json()
}

const tickerETF = async (tick) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/tickerETF/${tick}`, {
        method: 'GET',
    })
    return res.json()
}

const comparingCompanies = async (sector, tick1, tick2, year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/comparingCompanies/${sector}/${tick1}/${tick2}/${year}`, {
        method: 'GET',
    })
    return res.json()
}

const sector = async (sector, year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/sector/${sector}/${year}`, {
        method: 'GET',
    })
    return res.json()
}

const mostGrossing = async (year, sector, grossLow, grossHigh) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/mostGrossing/${year}?sector=${sector}&grossLow=${grossLow}&grossHigh=${grossHigh}`, {
        method: 'GET',
    })
    return res.json()
}

const OpVsTax = async (year1, year2, sector) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/OpVsTax/${year1}/${year2}?sector=${sector}`, {
        method: 'GET',
    })
    return res.json()
}

const ProfitGrowthPercentage = async (year1, year2, sector, percentLow, percentHigh) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/ProfitGrowthPercentage/${year1}/${year2}?sector=${sector}?percentLow=${percentLow}?percentHigh=${percentHigh}`, {
        method: 'GET',
    })
    return res.json()
}

const PreTaxVsTaxes = async (year1, year2, sector) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/PreTaxVsTaxes/${year1}/${year2}?sector=${sector}`, {
        method: 'GET',
    })
    return res.json()
}

export {
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
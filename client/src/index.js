import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import HomePage from './pages/HomePage';
import TickerFundamentalsPage from './pages/TickerFundamentalsPage';
import TickerCompetitorsPage from './pages/TickerCompetitorsPage';
import TickerNewsPage from './pages/TickerNewsPage';
import TickerETFPage from './pages/TickerETFPage';
import TickerInsiderPage from './pages/TickerInsiderPage';
import ComparingCompaniesPage from './pages/ComparingCompaniesPage';
import SectorPage from './pages/SectorPage';
import MostGrossingPage from './pages/MostGrossingPage';
import OpVsTaxPage from './pages/OpVsTaxPage';
import ProfitGrowthPercentagePage from './pages/ProfitGrowthPercentagePage';
import PreTaxVsTaxesPage from './pages/PreTaxVsTaxesPage';
import CompanyPage from './pages/CompanyPage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        <Route exact
							path="/tickerFundamentals"
							render={() => (
								<TickerFundamentalsPage />
							)}/>
		<Route exact
							path="/tickerFundamentals/:tick"
							render={(props) => (
								<CompanyPage {...props} />
							)}/>
        <Route exact
							path="/tickerCompetitors"
							render={() => (
								<TickerCompetitorsPage />
							)}/>
        <Route exact
							path="/tickerNews"
							render={() => (
								<TickerNewsPage />
							)}/>
        <Route exact
							path="/tickerETF"
							render={() => (
								<TickerETFPage />
							)}/>
        <Route exact
							path="/tickerInsider"
							render={() => (
								<TickerInsiderPage />
							)}/>
        <Route exact
							path="/comparingCompanies"
							render={() => (
								<ComparingCompaniesPage />
							)}/>
        <Route exact
							path="/sector"
							render={() => (
								<SectorPage />
							)}/>
        <Route exact
							path="/mostGrossing"
							render={() => (
								<MostGrossingPage />
							)}/>
        <Route exact
							path="/opVsTax"
							render={() => (
								<OpVsTaxPage />
							)}/>
        <Route exact
							path="/profitGrowthPercentage"
							render={() => (
								<ProfitGrowthPercentagePage />
							)}/>
        <Route exact
							path="/preTaxVsTaxes"
							render={() => (
								<PreTaxVsTaxesPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

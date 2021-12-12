import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
            <Navbar type="light" theme="lightcyan" expand="md">
        <NavbarBrand href="/">MyHedgeFund</NavbarBrand>
          <Nav navbar>
            <NavItem>
              <NavLink active href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/tickerFundamentals">
                Fundamentals
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/tickerCompetitors">
              Competitors
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/tickerNews">
                News
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/tickerInsider">
                Insider Activity
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/tickerETF">
                ETFs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/comparingCompanies">
                Comparison
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/sector">
                Sectors
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/mostGrossing">
                Gross Profits
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/opVsTax">
               Operating Expenses
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/profitGrowthPercentage">
                Profit Growth
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/preTaxVsTaxes">
              PreTax Income vs. Taxes
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar

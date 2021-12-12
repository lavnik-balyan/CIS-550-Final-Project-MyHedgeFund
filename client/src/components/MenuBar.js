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
                Insider
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/tickerETF">
                ETF
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/comparingCompanies">
                Comparison
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/sector">
                Sector
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/mostGrossing">
                MostGrossing
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/opVsTax">
               opVsTax
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/profitGrowthPercentage">
                Growth
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/preTaxVsTaxes">
              preTaxVsTaxes
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar

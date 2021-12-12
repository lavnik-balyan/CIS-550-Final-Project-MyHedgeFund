import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { tickerFundamentals, tickerCompetitors, tickerNews, tickerInsider, tickerETF, comparingCompanies, sector,  mostGrossing, opVsTax, 
  profitGrowthPercentage, preTaxVsTaxes } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tickerResults: [],
      tickerPageNumber: 1,
      tickerPageSize: 10,
      pagination: null
    }
    this.sectorOnChange = this.sectorOnChange.bind(this)
    this.goToTicker = this.goToTicker.bind(this)
  }

  goToTicker(tickerId) {
    window.location = `/tickerFundamentals/${tickerId}`
  }

  sectorOnChange(value) {
    console.log(value)
    sector(value, '2021').then(res => {
      this.setState({tickerResults: res.results})
    })
  }

  componentDidMount() {
    sector('Communication Services', '2021').then(res => {
      console.log(res.results)
      this.setState({tickerResults: res.results})
    })

  }

  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ backgroundColor: 'lightcyan', width: '100vw', margin: '0 auto', marginTop: '2vh' }}>
        <br/>
        <div style={{ textAlign: 'center' }}><h3>Companies</h3>
          <p><b>Choose a Sector: </b><Select defaultValue="Communication Services" style={{ width: 200 }} onChange={this.sectorOnChange}>
            <Option value="Communication Services">Communication Services</Option>
            <Option value="Consumer Discretionary">Consumer Discretionary</Option>
            <Option value="Consumer Staples">Consumer Staples</Option>
            <Option value="Energy">Energy</Option>
            <Option value="Financials">Financials</Option>
            <Option value="Health Care">Health Care</Option>
            <Option value="Industrials">Industrials</Option>
            <Option value="Information Technology">Information Technology</Option>
            <Option value="Materials">Materials</Option>
            <Option value="Real Estate">Real Estate</Option>
            <Option value="Utilities">Utilities</Option>
          </Select></p></div>
          
          <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToTicker(record.Ticker)}, 
    };
  }} dataSource={this.state.tickerResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
            <Column title="Ticker" dataIndex="Ticker" key="Ticker" sorter= {(a, b) => a.Ticker.localeCompare(b.Ticker)}/>
            <Column title="Name" dataIndex="Name" key="Name" sorter= {(a, b) => a.Name.localeCompare(b.Name)}/>
          </Table>

        </div>


      </div>
    )
  }

}

export default HomePage

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
    sector('Information Technology', '2021').then(res => {
      console.log(res.results)
      this.setState({tickerResults: res.results})
    })

  }

  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3>Tickers</h3>
          <Select defaultValue="Information Technology" style={{ width: 120 }} onChange={this.sectorOnChange}>
            <Option value="Information Technology">Information Technology</Option>
             {/* TASK 3: Take a look at Dataset Information.md from MS1 and add other options to the selector here  */}
             <Option value="Health Care">Health Care</Option>
             <Option value="Industrials">Industrials</Option>
             <Option value="Utilities">Utilities</Option>
             <Option value="Consumer Staples">Consumer Staples</Option>
             <Option value="Consumer Discretionary">Consumer Discretionary</Option>
          </Select>
          
          <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToTicker(record.tickerId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
    };
  }} dataSource={this.state.tickerResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
            <ColumnGroup title="Tickers">
              {/* TASK 4: correct the title for the 'Home' column and add a similar column for 'Away' team in this ColumnGroup */}
              <Column title="Ticker" dataIndex="Ticker" key="Ticker" sorter= {(a, b) => a.Ticker.localeCompare(b.Ticker)}/>
              <Column title="Name" dataIndex="Name" key="Name" sorter= {(a, b) => a.Name.localeCompare(b.Name)}/>
            </ColumnGroup>
          </Table>

        </div>


      </div>
    )
  }

}







export default HomePage

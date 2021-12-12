import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { tickerFundamentals } from '../fetcher'

import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;

export default class CompanyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tickerQuery: this.props.match.params.tick,
            tickerResults: []
        }
        this.goToTicker = this.goToTicker.bind(this)
    }

    goToTicker(tickerId) {
        window.location = `/tickerFundamentals/${tickerId}`
    }

    componentDidMount() {
        console.log(this.props.match.params.tick)
        tickerFundamentals(this.state.tickerQuery, this.state.yearQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <div style={{ backgroundColor: '#BFFFD1', width: '100vw', margin: '0 auto', marginTop: '0vh' }}>
                <br />
                <div style={{ textAlign: 'center', paddingTop: '10px'}}><h3>Fundamentals for {this.props.match.params.tick}</h3></div>
                <br />
                <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToTicker(record.Ticker)},  
    };
  }} dataSource={this.state.tickerResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}> 
            <Column title="Ticker" dataIndex="Ticker" key="Ticker" sorter= {(a, b) => a.Ticker.localeCompare(b.Ticker)}/>
            <Column title="Name" dataIndex="Name" key="Name" sorter= {(a, b) => a.Name.localeCompare(b.Name)}/>
            <Column title="Sector" dataIndex="Sector" key="Sector" sorter= {(a, b) => a.Sector.localeCompare(b.Sector)}/>
            <Column title="Year" dataIndex="Year" key="Year" sorter= {(a, b) => a.Year.localeCompare(b.Year)}/>
            <Column title="Total Revenue" dataIndex="Total_Revenue" key="Total_Revenue" sorter= {(a, b) => a.Total_Revenue.localeCompare(b.Total_Revenue)}/>
            <Column title="Cost Of Revenue" dataIndex="Cost_Of_Revenue" key="Cost_Of_Revenue" sorter= {(a, b) => a.Cost_Of_Revenue.localeCompare(b.Cost_Of_Revenue)}/>
            <Column title="Gross Profit" dataIndex="Gross_Profit" key="Gross_Profit" sorter= {(a, b) => a.Gross_Profit.localeCompare(b.Gross_Profit)}/>
            <Column title="Operating Expense" dataIndex="Operating_Expense" key="Operating_Expense" sorter= {(a, b) => a.Operating_Expense.localeCompare(b.Operating_Expense)}/>
            <Column title="Operating Income" dataIndex="Operating_Income" key="Operating_Income" sorter= {(a, b) => a.Operating_Income.localeCompare(b.Operating_Income)}/>
            <Column title="Net Non-Operating Income" dataIndex="Net_Non_Operating_Income" key="Net_Non_Operating_Income" sorter= {(a, b) => a.Net_Non_Operating_Income.localeCompare(b.Net_Non_Operating_Income)}/>
            <Column title="Other Income Expenses" dataIndex="Other_Income_Expenses" key="Other_Income_Expenses" sorter= {(a, b) => a.Other_Income_Expenses.localeCompare(b.Other_Income_Expenses)}/>
            <Column title="Pre-Tax Income" dataIndex="PreTax_Income" key="PreTax_Income" sorter= {(a, b) => a.PreTax_Income.localeCompare(b.PreTax_Income)}/>
            <Column title="Tax Provision" dataIndex="Tax_Provision" key="Tax_Provision" sorter= {(a, b) => a.Tax_Provision.localeCompare(b.Tax_Provision)}/>
          </Table>
        </div>
        </div>
        )
    }
}
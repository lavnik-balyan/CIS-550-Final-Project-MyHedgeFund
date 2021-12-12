import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { sector } from '../fetcher'

import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;

class SectorPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sectorQuery: "",
            yearQuery: "",
            tickerResults: []
        }
        this.handleSectorQueryChange = this.handleSectorQueryChange.bind(this)
        this.handleYearQueryChange = this.handleYearQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToTicker = this.goToTicker.bind(this)
    }

    goToTicker(tickerId) {
        window.location = `/tickerFundamentals/${tickerId}`
    }

    handleSectorQueryChange(event) {
        this.setState({ sectorQuery: event.target.value })
    }

    handleYearQueryChange(event) {
        this.setState({ yearQuery: event.target.value })
    }

    updateSearchResults() {
        sector(this.state.sectorQuery, this.state.yearQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    componentDidMount() {
        sector(this.state.sectorQuery, this.state.yearQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ backgroundColor: 'lightcyan', width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Sector</label>
                            <FormInput placeholder="Sector" value={this.state.sectorQuery} onChange={this.handleSectorQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Year</label>
                            <FormInput placeholder="Year" value={this.state.yearQuery} onChange={this.handleYearQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <Divider />
                <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToTicker(record.tickerId)},  
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
        )
    }
}

export default SectorPage
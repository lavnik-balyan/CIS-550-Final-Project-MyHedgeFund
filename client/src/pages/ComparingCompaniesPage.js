import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,
    Select,
} from 'antd'

import { comparingCompanies } from '../fetcher'

import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;

const { Option } = Select;

class ComparingCompaniesPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sectorQuery: "Communication Services",
            yearQuery: "",
            tick1Query: "",
            tick2Query: "",
            tickerResults: []
        }
        this.handleSectorQueryChange = this.handleSectorQueryChange.bind(this)
        this.handleTick1QueryChange = this.handleTick1QueryChange.bind(this)
        this.handleTick2QueryChange = this.handleTick2QueryChange.bind(this)
        this.handleYearQueryChange = this.handleYearQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToTicker = this.goToTicker.bind(this)
    }

    goToTicker(tickerId) {
        window.location = `/tickerFundamentals/${tickerId}`
    }

    handleSectorQueryChange(event) {
        this.setState({ sectorQuery: event })
    }

    handleTick1QueryChange(event) {
        this.setState({ tick1Query: event.target.value })
    }

    handleTick2QueryChange(event) {
        this.setState({ tick2Query: event.target.value })
    }

    handleYearQueryChange(event) {
        this.setState({ yearQuery: event.target.value })
    }

    updateSearchResults() {
        comparingCompanies(this.state.sectorQuery, this.state.tick1Query, this.state.tick2Query, this.state.yearQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    componentDidMount() {
        comparingCompanies(this.state.sectorQuery, this.state.tick1Query, this.state.tick2Query, this.state.yearQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <div style={{ backgroundColor: '#BFFFD1', width: '100vw', margin: '0 auto', marginTop: '0vh' }}>
                <br/>
                <div style={{ textAlign: 'center' }}><h3>Comparing Companies</h3></div>
                <div style={{ textAlign: 'center' }}>
                    <p><b>Returns the most relevant comparative information between two stocks in the same sector. </b></p>
                </div>
                <Divider />
                <Form style={{ width: '100vw', margin: '0 auto', paddingBottom: '2vh'}}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Sector</label>
                            <br />
                            <Select defaultValue="--------------- Select ---------------" style={{ width: '20vw', position: 'absolute', bottom: '0px' }} onChange={this.handleSectorQueryChange}>
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
                            </Select>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Ticker 1</label>
                            <FormInput placeholder="Ticker 1" value={this.state.tick1Query} onChange={this.handleTick1QueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Ticker 2</label>
                            <FormInput placeholder="Ticker 2" value={this.state.tick2Query} onChange={this.handleTick2QueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Year</label>
                            <FormInput placeholder="Year" value={this.state.yearQuery} onChange={this.handleYearQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                            <Button style={{ width: "80%", position: 'absolute', bottom: '0px' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToTicker(record.tickerId)},  
    };
  }} dataSource={this.state.tickerResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}> 
            <Column title="Ticker" dataIndex="Ticker" key="Ticker" sorter= {(a, b) => a.Ticker.localeCompare(b.Ticker)}/>
            <Column title="Year" dataIndex="Year" key="Year" sorter= {(a, b) => a.Year - b.Year}/>
            <Column title="Total Revenue" dataIndex="Total_Revenue" key="Total_Revenue" sorter= {(a, b) => a.Total_Revenue - b.Total_Revenue}/>
            <Column title="Cost Of Revenue" dataIndex="Cost_Of_Revenue" key="Cost_Of_Revenue" sorter= {(a, b) => a.Cost_Of_Revenue - b.Cost_Of_Revenue}/>
            <Column title="Gross Profit" dataIndex="Gross_Profit" key="Gross_Profit" sorter= {(a, b) => a.Gross_Profit - b.Gross_Profit}/>
            <Column title="Operating Expense" dataIndex="Operating_Expense" key="Operating_Expense" sorter= {(a, b) => a.Operating_Expense - b.Operating_Expense}/>
            <Column title="Operating Income" dataIndex="Operating_Income" key="Operating_Income" sorter= {(a, b) => a.Operating_Income - b.Operating_Income}/>
          </Table>
        </div>
        </div>
        )
    }
}

export default ComparingCompaniesPage

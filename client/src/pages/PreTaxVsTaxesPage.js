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

import { preTaxVsTaxes } from '../fetcher'

import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;

const { Option } = Select;

class PreTaxVsTaxesPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sectorQuery: "",
            year1Query: "",
            year2Query: "",
            tickerResults: []
        }
        this.handleSectorQueryChange = this.handleSectorQueryChange.bind(this)
        this.handleYear1QueryChange = this.handleYear1QueryChange.bind(this)
        this.handleYear2QueryChange = this.handleYear2QueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToTicker = this.goToTicker.bind(this)
    }

    goToTicker(tickerId) {
        window.location = `/tickerFundamentals/${tickerId}`
    }

    handleSectorQueryChange(event) {
        this.setState({ sectorQuery: event })
    }

    handleYear1QueryChange(event) {
        this.setState({ year1Query: event.target.value })
    }

    handleYear2QueryChange(event) {
        this.setState({ year2Query: event.target.value })
    }

    updateSearchResults() {
        preTaxVsTaxes(this.state.year1Query, this.state.year2Query, this.state.sectorQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    componentDidMount() {
        preTaxVsTaxes(this.state.year1Query, this.state.year2Query, this.state.sectorQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <div style={{ backgroundColor: '#BFFFD1', width: '100vw', margin: '0 auto', marginTop: '0vh' }}>
                <br/>
                <div style={{ textAlign: 'center' }}><h3>PreTax Income vs. Taxes</h3></div>
                <br />
                <div style={{ textAlign: 'left', width: '50vw', margin: '0 auto', marginTop: '0vh'}}>
                    <p><b>Returns company information about companies that experienced a percentage increase in taxes paid that was less than their percentage increase in pretax income between two years. </b></p>
                    <p>There is an optional parameter to filter by sector.</p>
                </div>
                <Divider />
                <Form  style={{ width: '80vw', margin: '0 auto', paddingBottom: '2vh'}}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Year 1</label>
                            <FormInput placeholder="Year 1" value={this.state.year1Query} onChange={this.handleYear1QueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Year 2</label>
                            <FormInput placeholder="Year 2" value={this.state.year2Query} onChange={this.handleYear2QueryChange} />
                        </FormGroup></Col>
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
                        <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                            <Button style={{ width: "80%", position: 'absolute', bottom: '0px' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <br/>
                <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToTicker(record.Ticker)},  
    };
  }} dataSource={this.state.tickerResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
            <Column title="Ticker" dataIndex="Ticker" key="Ticker" sorter= {(a, b) => a.Ticker.localeCompare(b.Ticker)}/> 
            <Column title="Tax Provision % Increase" dataIndex="TaxProvisionIncreasePercentage" key="TaxProvisionIncreasePercentage" sorter= {(a, b) => a.TaxProvisionIncreasePercentage - b.TaxProvisionIncreasePercentage}/>
            <Column title="Pre-Tax Income % Increase" dataIndex="PreTaxIncomeIncreasePercentage" key="PreTaxIncomeIncreasePercentage" sorter= {(a, b) => a.PreTaxIncomeIncreasePercentage - b.PreTaxIncomeIncreasePercentage}/>
          </Table>
        </div>
        </div>
        )
    }
}

export default PreTaxVsTaxesPage

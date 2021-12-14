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

import { mostGrossing } from '../fetcher'

import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;

const { Option } = Select;

class MostGrossingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sectorQuery: "",
            yearQuery: "",
            grossLowQuery: 0,
            grossHighQuery: 1000000000000000,
            tickerResults: []
        }
        this.handleSectorQueryChange = this.handleSectorQueryChange.bind(this)
        this.handleYearQueryChange = this.handleYearQueryChange.bind(this)
        this.handleGrossLowQueryChange = this.handleGrossLowQueryChange.bind(this)
        this.handleGrossHighQueryChange = this.handleGrossHighQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToTicker = this.goToTicker.bind(this)
    }

    goToTicker(tickerId) {
        window.location = `/tickerFundamentals/${tickerId}`
    }

    handleSectorQueryChange(event) {
        this.setState({ sectorQuery: event })
    }

    handleYearQueryChange(event) {
        this.setState({ yearQuery: event.target.value })
    }

    handleGrossLowQueryChange(event) {
        this.setState({ grossLowQuery: event.target.value })
    }

    handleGrossHighQueryChange(event) {
        this.setState({ grossHighQuery: event.target.value })
    }

    updateSearchResults() {
        mostGrossing(this.state.yearQuery, this.state.sectorQuery, this.state.grossLowQuery, this.state.grossHighQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    componentDidMount() {
        mostGrossing(this.state.yearQuery, this.state.sectorQuery, this.state.grossLowQuery, this.state.grossHighQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <div style={{ backgroundColor: '#BFFFD1', width: '100vw', margin: '0 auto', marginTop: '0vh' }}>
                <br/>
                <div style={{ textAlign: 'center' }}><h3>Most Grossing Companies</h3></div>
                <br />
                <div style={{ textAlign: 'left', width: '50vw', margin: '0 auto', marginTop: '0vh'}}>
                    <p><b>Returns the financial information about the companies that had the highest gross profit in a given year. </b></p>
                    <p>If a sector is provided, only companies in the given sector will be returned. There is also opportunity to 
                    provide a range of acceptable gross profits if desired.</p>
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
                            <label>Year</label>
                            <FormInput placeholder="Year" value={this.state.yearQuery} onChange={this.handleYearQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Low Gross Profit</label>
                            <FormInput placeholder="lowGross" value={this.state.grossLowQuery} onChange={this.handleGrossLowQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>High Gross Profit</label>
                            <FormInput placeholder="highGross" value={this.state.grossHighQuery} onChange={this.handleGrossHighQueryChange} />
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
            <Column title="Name" dataIndex="Name" key="Name" sorter= {(a, b) => a.Name.localeCompare(b.Name)}/>
            <Column title="Sector" dataIndex="Sector" key="Sector" sorter= {(a, b) => a.Sector.localeCompare(b.Sector)}/>
            <Column title="Gross Profit" dataIndex="Gross_Profit" key="Gross_Profit" sorter= {(a, b) => a.Gross_Profit - b.Gross_Profit}/>
            <Column title="Year" dataIndex="Year" key="Year" sorter= {(a, b) => a.Year - b.Year}/>
          </Table>
        </div>
        </div>
        )
    }
}

export default MostGrossingPage

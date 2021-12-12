import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { profitGrowthPercentage } from '../fetcher'

import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;

class ProfitGrowthPercentagePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            year1Query: "",
            year2Query: "",
            sectorQuery: "",
            percentLowQuery: 0,
            percentHighQuery: 1000,
            tickerResults: []
        }
        this.handleSectorQueryChange = this.handleSectorQueryChange.bind(this)
        this.handleYear1QueryChange = this.handleYear1QueryChange.bind(this)
        this.handleYear2QueryChange = this.handleYear2QueryChange.bind(this)
        this.handlePercentLowQueryChange = this.handlePercentLowQueryChange.bind(this)
        this.handlePercentHighQueryChange = this.handlePercentHighQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToTicker = this.goToTicker.bind(this)
    }

    goToTicker(tickerId) {
        window.location = `/tickerFundamentals/${tickerId}`
    }

    handleSectorQueryChange(event) {
        this.setState({ sectorQuery: event.target.value })
    }

    handleYear1QueryChange(event) {
        this.setState({ year1Query: event.target.value })
    }

    handleYear2QueryChange(event) {
        this.setState({ year2Query: event.target.value })
    }

    handlePercentLowQueryChange(event) {
        this.setState({ percentLowQuery: event.target.value })
    }

    handlePercentHighQueryChange(event) {
        this.setState({ percentHighQuery: event.target.value })
    }

    updateSearchResults() {
        profitGrowthPercentage(this.state.year1Query, this.state.year2Query, this.state.sectorQuery, this.state.percentLowQuery, this.state.percentHighQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    componentDidMount() {
        profitGrowthPercentage(this.state.year1Query, this.state.year2Query, this.state.sectorQuery, this.state.percentLowQuery, this.state.percentHighQuery).then(res => {
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
                            <label>Year 1</label>
                            <FormInput placeholder="Year 1" value={this.state.year1Query} onChange={this.handleYear1QueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Year 2</label>
                            <FormInput placeholder="Year 2" value={this.state.year2Query} onChange={this.handleYear2QueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Sector</label>
                            <FormInput placeholder="Sector" value={this.state.SectorQuery} onChange={this.handleSectorQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Low Percentage</label>
                            <FormInput placeholder="percentLowQuery" value={this.state.percentLowQuery} onChange={this.handlePercentLowQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>High Percentage</label>
                            <FormInput placeholder="percentHighQuery" value={this.state.percentHighQuery} onChange={this.handlePercentHighQueryChange} />
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
            <Column title="Growth Rate" dataIndex="GROWTHRATE" key="GROWTHRATE" sorter= {(a, b) => a.GROWTHRATE.localeCompare(b.GROWTHRATE)}/>
          </Table>
        </div>
        )
    }
}

export default ProfitGrowthPercentagePage
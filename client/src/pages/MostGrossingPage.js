import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { mostGrossing } from '../fetcher'

import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;

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
        this.setState({ sectorQuery: event.target.value })
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
                <Form style={{ backgroundColor: 'lightcyan', width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Sector</label>
                            <FormInput placeholder="Sector" value={this.state.SectorQuery} onChange={this.handleSectorQueryChange} />
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
            <Column title="Gross Profit" dataIndex="Gross_Profit" key="Gross_Profit" sorter= {(a, b) => a.Gross_Profit.localeCompare(b.Gross_Profit)}/>
            <Column title="Year" dataIndex="Year" key="Year" sorter= {(a, b) => a.Year.localeCompare(b.Year)}/>
          </Table>
        </div>
        )
    }
}

export default MostGrossingPage
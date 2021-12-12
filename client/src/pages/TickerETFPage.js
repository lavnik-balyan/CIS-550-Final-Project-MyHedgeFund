import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { tickerETF } from '../fetcher'

import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;

class TickerETFPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tickerQuery: "",
            tickerResults: []
        }
        this.handleTickerQueryChange = this.handleTickerQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToTicker = this.goToTicker.bind(this)
    }

    goToTicker(tickerId) {
        window.location = `/tickerFundamentals/${tickerId}`
    }

    handleTickerQueryChange(event) {
        this.setState({ tickerQuery: event.target.value })
    }

    updateSearchResults() {
        tickerETF(this.state.tickerQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    componentDidMount() {
        tickerETF(this.state.tickerQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <div style={{ backgroundColor: 'lightcyan', width: '100vw', margin: '0 auto', marginTop: '2vh' }}>
                <br/>
                <div style={{ textAlign: 'center' }}><h3>ETF</h3></div>
                <Form style={{ width: '40vw', margin: '0 auto', paddingBottom: '2vh'}}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Ticker</label>
                            <FormInput placeholder="Ticker" value={this.state.tickerQuery} onChange={this.handleTickerQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                            <Button style={{ width: "100%", marginTop: '3.25vh'}} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToTicker(record.tickerId)},  
    };
  }} dataSource={this.state.tickerResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}> 
            <Column title="Ticker" dataIndex="Ticker" key="Ticker" sorter= {(a, b) => a.Ticker.localeCompare(b.Ticker)}/>
            <Column title="ETF Ticker" dataIndex="ETFTicker" key="ETFTicker" sorter= {(a, b) => a.ETFTicker.localeCompare(b.ETFTicker)}/>
            <Column title="ETF Name" dataIndex="ETFName" key="ETFName" sorter= {(a, b) => a.ETFName.localeCompare(b.ETFName)}/>
            <Column title="Category" dataIndex="Category" key="Category" sorter= {(a, b) => a.Category.localeCompare(b.Category)}/>
            <Column title="Expense Ratio" dataIndex="ExpenseRatio" key="ExpenseRatio" sorter= {(a, b) => a.ExpenseRatio.localeCompare(b.ExpenseRatio)}/>
            <Column title="Weightage" dataIndex="Weightage" key="Weightage" sorter= {(a, b) => a.Weightage.localeCompare(b.Weightage)}/>
          </Table>
        </div>
        </div>
        )
    }
}

export default TickerETFPage
import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { tickerInsider } from '../fetcher'

import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;

class TickerInsiderPage extends React.Component {
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
        tickerInsider(this.state.tickerQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    componentDidMount() {
        tickerInsider(this.state.tickerQuery).then(res => {
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
                            <label>Ticker</label>
                            <FormInput placeholder="Ticker" value={this.state.tickerQuery} onChange={this.handleTickerQueryChange} />
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
            <Column title="Filling Date" dataIndex="FillingDate" key="FillingDate" sorter= {(a, b) => a.FillingDate.localeCompare(b.FillingDate)}/>
            <Column title="Insider Name" dataIndex="InsiderName" key="InsiderName" sorter= {(a, b) => a.InsiderName.localeCompare(b.InsiderName)}/>
            <Column title="Title" dataIndex="Title" key="Title" />
            <Column title="Type" dataIndex="Type" key="Type" />
            <Column title="Price" dataIndex="Price" key="Price" sorter= {(a, b) => a.Price.localeCompare(b.Price)}/>
            <Column title="Owned" dataIndex="Owned" key="Owned" sorter= {(a, b) => a.Owned.localeCompare(b.Owned)}/>
            <Column title="Value" dataIndex="Value" key="Value" sorter= {(a, b) => a.Value.localeCompare(b.Value)}/>
          </Table>
        </div>
        )
    }
}

export default TickerInsiderPage
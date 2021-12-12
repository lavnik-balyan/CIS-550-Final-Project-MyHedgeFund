import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { tickerCompetitors } from '../fetcher'

import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;

class TickerCompetitorsPage extends React.Component {
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
        tickerCompetitors(this.state.tickerQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    componentDidMount() {
        tickerCompetitors(this.state.tickerQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <div style={{ backgroundColor: '#BFFFD1', width: '100vw', margin: '0 auto', marginTop: '0vh' }}>
                <br/>
                <div style={{ textAlign: 'center' }}><h3>Competitors</h3></div>
                <div style={{ textAlign: 'center' }}>
                    <p><b>Returns the most relevant comparative information about two stocks in the same sector.</b></p>
                </div>
                <Divider />
                <Form style={{ width: '40vw', margin: '0 auto', paddingBottom: '2vh'}}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Ticker</label>
                            <FormInput placeholder="Ticker" value={this.state.tickerQuery} onChange={this.handleTickerQueryChange} />
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
          </Table>
        </div>
        </div>
        )
    }
}

export default TickerCompetitorsPage
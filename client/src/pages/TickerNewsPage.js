import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { tickerNews } from '../fetcher'

import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;

class TickerNewsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tickerQuery: "",
            tickerResults: []
        }
        this.handleTickerQueryChange = this.handleTickerQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
    }

    handleTickerQueryChange(event) {
        this.setState({ tickerQuery: event.target.value })
    }

    updateSearchResults() {
        tickerNews(this.state.tickerQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    componentDidMount() {
        tickerNews(this.state.tickerQuery).then(res => {
            this.setState({ tickerResults: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <div style={{ backgroundColor: '#BFFFD1', width: '100vw', margin: '0 auto', marginTop: '0vh' }}>
                <br/>
                <div style={{ textAlign: 'center' }}><h3>News</h3></div>
                <div style={{ textAlign: 'center' }}>
                    <p><b>Returns the latest news stories and current affairs on a particular company.</b></p>
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
                <Table dataSource={this.state.tickerResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}> 
            <Column title="Headline" dataIndex="Headline" key="Headline" sorter= {(a, b) => a.Headline.localeCompare(b.Headline)}/>
            <Column title="Article Link" dataIndex="ArticleLink" key="ArticleLink" />
          </Table>
        </div>
        </div>
        )
    }
}

export default TickerNewsPage
import React from 'react';
import { handleDeleteRow } from '../actions/rowActions';
import { REST_URL, NOTIFY_URL } from '../constants';
import axios from 'axios';
import Info from '../info_data.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

var keygen = 0;

class Display extends React.Component{
    constructor(props){
        super(props)
        this.state={
            subscribed :  [
                {
                    coin : 'BTC',
                    date : 'Jul-06-2018',
                    price_block : 'price',
                    condition : '<',
                    limit: '6000'
                },
                {
                    coin : 'LTC',
                    date : 'Jul-08-2018',
                    price_block : 'price',
                    condition : '<',
                    limit: '70'
                },
            ]
        }
    }

    render(){

        return(
        <div className="container">
            <h4>Currently Subscribed Notifications:</h4>
            <BootstrapTable data={this.state.subscribed} striped hover>
                <TableHeaderColumn isKey={true} dataField='date' dataSort={ true }>Time Subscribed</TableHeaderColumn>
                <TableHeaderColumn dataField='coin'>Coin to Watch</TableHeaderColumn>
                <TableHeaderColumn dataField='price_block'>Price/Block</TableHeaderColumn>
                <TableHeaderColumn dataField='condition'>Condition</TableHeaderColumn>
                <TableHeaderColumn dataField='limit'>Limit</TableHeaderColumn>
            </BootstrapTable>
        </div>    
        )
    }
}

export default Display
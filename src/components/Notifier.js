import React from 'react';
import { connect } from 'react-redux'
import { handleDeleteRow } from '../actions/rowActions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './react-bootstrap-table-all.min.css';
import './Notifier.css'
import {MICRO, MILLI} from '../constants.js'

var key_gen = 0


class Notifier extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            messages : []
        }
    }

    componentDidMount(){
        let url = 'http://localhost:8888/notify'
        fetch(url).then(res => res.json().then(data => {
            let convertedMessages = data.notifications.map(entry => 
                ({message : entry.message, date : new Date(entry.timestamp/MILLI).toString()}));
            this.setState({messages : convertedMessages})
        })).catch(function(err) {
            console.error('Fetch Error :-S', err);
            return false;   
        });
    }

    render(){
        console.log(this.state.messages)
        return(
            <div className="container" id ="notifier">
            <h4>Important Notifications:</h4>
            <BootstrapTable data={this.state.messages} striped hover>
                <TableHeaderColumn isKey={true} dataField='message'>Message</TableHeaderColumn>
                <TableHeaderColumn dataField='date'>Happend At</TableHeaderColumn>
            </BootstrapTable>
            </div>        
            ) 
    }
}

export default Notifier
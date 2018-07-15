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
            messages : [{"date" : "July 1st 2018", "message" : "Price of BTC has reached 6200"}, {"date" : "July 2nd 2018", "message" : "Price of LTC has reached 80"}],
            expired_messages : [{"date" : "June 15th 2018", "message" : "Price of BTC has reached 6000"}, {"date" : "June 28th 2018", "message" : "Price of LTC has reached 80"}],
            expanded : false
        }
        this.handleExpand = this.handleExpand.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleClear = this.handleClear.bind(this)
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

    handleExpand(e){
        e.preventDefault();
        this.setState({expanded : true})
        let url = 'http://localhost:888/notify'
        fetch(url).then(res =>res.json().then(data => {
            let expiredMessages = data.expired_messages.map(entry => 
                ({message : entry.message, date : new Date(entry.timestamp/MILLI).toString()}));
            this.setState({expired_messages : expiredMessages})
        })).catch(err => {
            console.log('Fetch Error :-s', err); 
            return false; 
            });
    }

    handleClose(e){
        e.preventDefault();
        this.setState({expanded : false})

    }

    handleClear(e){
        e.preventDefault();
        this.setState({expired_messages : []})
        console.log("clear")
    }
        
    render(){
        let ExpandedList =
            <div>
                <h4>Previous Notifications:</h4>
                <button type="submit" className="btn btn-secondary btn-sm" data-toggle="modal" data-target="#clearModal">Clear</button>
                <div className="modal fade" id="clearModal" tabindex="-1" role="dialog" aria-labelledby="clearModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="clearModalLabel">Clear all Notifications?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        You are about to clear all save notifications. 
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Back</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick = {(e) => this.handleClear(e)}>Okay</button>
                    </div>
                    </div>
                </div>
                </div>    
                <BootstrapTable data={this.state.expired_messages} striped hover pagination>
                    <TableHeaderColumn dataField='date' dataSort={ true }>Time</TableHeaderColumn>
                    <TableHeaderColumn isKey={true} dataField='message'>Message</TableHeaderColumn>
                </BootstrapTable>
            </div>
        
        let expandButton = 
            <button type="submit" className="btn btn-success btn-sm" onClick = {(e) => this.handleExpand(e)}>+ See Previous Notifications</button>

        let closeButton = 
            <button type="submit" className="btn btn-success btn-sm" onClick = {(e) => this.handleClose(e)}>- Close</button>

        return(
            <div className="container" id ="notifier">
            <h4>Current Notifications:</h4>
            <BootstrapTable data={this.state.messages} striped hover>
                <TableHeaderColumn dataField='date'>Time</TableHeaderColumn>
                <TableHeaderColumn isKey={true} dataField='message'>Message</TableHeaderColumn>
            </BootstrapTable>
            {/*neeb button groups to show previous notifications(needs to be scrollable) and clear previous notifications */}
            {this.state.expanded ? closeButton : expandButton}
            {this.state.expanded ? ExpandedList : null}
            </div>        
            ) 
    }
}

export default Notifier
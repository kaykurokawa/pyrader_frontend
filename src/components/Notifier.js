import React from 'react';
import { connect } from 'react-redux'
import { handleDeleteRow } from '../actions/rowActions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './react-bootstrap-table-all.min.css';
import './Notifier.css'
import {MICRO, MILLI, NOTIFY_URL, STANDARD_PARAMETER, SAVE_PARAMETER} from '../constants.js'
import axios from 'axios';
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
        const curr_component = this
        poll() // every 5 minutes
        function poll(){
            fetch(NOTIFY_URL + STANDARD_PARAMETER).then(res => res.json().then(
 	            data => {
                    let convertedMessages = data.notifications.map(entry => 
                        ({message : entry.message, date : new Date(entry.timestamp/MILLI).toString()}));
                    curr_component.setState({messages : convertedMessages})
 	                setTimeout(poll, 300 * MILLI);
                        }
                    )
                ).catch(function(err) {
                    console.error('Fetch Error :-S', err);
                    setTimeout(poll, 300 * MILLI);  
                });
        }
    }

    handleExpand(e){
        e.preventDefault();
        this.setState({expanded : true})
        let url = NOTIFY_URL + SAVE_PARAMETER;
        fetch(url).then(res =>res.json().then(data => {
            let expiredMessages = data.saved.map(entry => 
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
        let post_body = {clear_saves : "true"}
        axios.post(NOTIFY_URL, post_body)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
        
    render(){
        let ExpandedList =
            <div>
                <h4>Previous Notifications:</h4>
                <button type="submit" className="btn btn-secondary btn-sm" data-toggle="modal" data-target="#clearModal">Clear</button>
                <div className="modal fade" id="clearModal" tabIndex="-1" role="dialog" aria-labelledby="clearModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="clearModalLabel">Clear all Notifications?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h4>You are about to clear all save notifications.</h4> 
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
            <button type="submit" className="btn btn-danger btn-sm" onClick = {(e) => this.handleClose(e)}>- Close</button>

        return(
            <div className="container" id ="notifier">
            <h4>Current Notifications:</h4>
            <BootstrapTable data={this.state.messages} striped hover>
                <TableHeaderColumn dataField='date' dataSort={ true }>Time</TableHeaderColumn>
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
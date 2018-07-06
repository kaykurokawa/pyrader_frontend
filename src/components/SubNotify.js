import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import Dropdowns from './Dropdowns.js'
import Subscriber from './Subscriber.js'
import Notifier from './Notifier.js'

class SubNotify extends React.Component{
    render() {
        return(
            <div>
                <Subscriber />
                <Notifier />
            </div>
        )
    }
}

export default SubNotify
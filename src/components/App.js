import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import Dropdowns from './Dropdowns.js'
import Table from './Table.js'
import Chart from './Chart.js'


class App extends React.Component{
    render() {

        return (
            <div>
                <Dropdowns />
            </div>
        )
    }
}

export default connect((state) => ({
    info : state.info
}))(App) 
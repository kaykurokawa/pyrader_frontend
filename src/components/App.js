import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import Dropdowns from './Dropdowns.js'
import Table from './Table.js'


class App extends React.Component{
    render() {

        return (
            <div>
                <Dropdowns />
                <Table />
            </div>
        )
    }
}

export default connect((state) => ({
    info : state.info
}))(App) 
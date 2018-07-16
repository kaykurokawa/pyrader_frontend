import React from 'react';
import { connect } from 'react-redux'
import { handleDeleteRow } from '../actions/rowActions';

class Table extends React.Component{
    constructor(props){
        super(props)
    this.handleRemove = this.handleRemove.bind(this)
    }

    handleRemove(id){
        this.props.dispatch(handleDeleteRow(id))
    }
    
    static getDerivedStateFromProps(props, prevState){
        
        return null;
    }


    render(){
        let rowItems = this.props.row.map(data => 
        <tr key = {data.id} id={'data-row-' + data.id}>
            <td>{data.type === "block" ? "Block" : "Price/Volume"}</td>
            <td>{data.type}</td>
            <td>{data.symbol}</td>
            <td>{data.exchange}</td>
            <td>{new Date(data.first_date).toDateString() + " " + new Date(data.first_date).toLocaleTimeString('en-US') + " to " +
                 new Date(data.last_date).toDateString() + " " + new Date(data.last_date).toLocaleTimeString('en-US')}</td>
            <td>{data.last_data}</td>
            <td>{data.units}</td>
            <td>{data.interval}</td>
            <td className = 'text-center'><span id='remove-row-react' className = {"glyphicon glyphicon-remove remove-react-" + data.id} onClick = { () => this.handleRemove(data.id)}></span></td>
        </tr>
        )
        return(
        <div>
            <table className="table" id="table-of-prices-react">
                <thead>
                    <tr>
                        <th>Price/Data Information:</th>
                        <th>Type of Data:</th>
                        <th>Coin:</th>
                        <th>Exchange:</th>
                        <th>Time Period:</th>
                        <th>Last Value:</th>
                        <th>Units:</th>
                        <th>Averaging:</th>
                        <th>Remove:</th>
                    </tr>
                </thead>
                <tbody>
                    {rowItems}
                </tbody>
            </table>
        </div>)
    }

}

export default connect((state) => ({
    row : state.row
}))(Table) 
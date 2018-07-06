import React from 'react';
import { connect } from 'react-redux'
import { handleDeleteRow } from '../actions/rowActions';

class Notifier extends React.Component{
    constructor(props){
        super(props)
    }


    render(){
   {/*a form has Watch, Condition, and Price-point*/}
        return(
            <table className="notify-table" id="notify-table">
            <thead>
                <tr>
                    <th>Watch</th>
                    <th>Condition</th>
                    <th>Price/Block</th>
                    <th>Time</th>
                </tr>
            </thead>    
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        )
    }
}

export default Notifier
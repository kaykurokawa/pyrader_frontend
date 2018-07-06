import React from 'react';
import { connect } from 'react-redux'
import { handleDeleteRow } from '../actions/rowActions';
import { REST_URL } from '../constants';

class Subscriber extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            watch : "",
            condition : "",
            price_point : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCondSelect = this.handleCondSelect.bind(this);
        this.handleWatchSelect = this.handleWatchSelect.bind(this);
        this.handleSubmit = this.handleFormSubmit.bind(this);
        
    }

    handleFormSubmit(event){
        event.preventDefault();
        post_url = "localhost:8888/notify";
        

    }

    handleChange(event){
        this.setState({price_point: event.target.value});
    }

    handleCondSelect(event){
        this.setState({condition: event.target.value});
    }

    handleWatchSelect(event){
        this.setState({watch: event.target.value});
    }

    render(){
   {/*a form has Watch, Condition, and Price-point*/}
        return(
        <form>
            <div className="form-row">
                <div class="form-group col-xs-4">
                        <label for="watch">Watch</label>
                        <select id="watch" class="form-control" value={this.state.watch} onChange={(e) => this.handleWatchSelect(e)}>
                            <option value="none">Choose...</option>
                            <option value="BCH">BCH</option>
                            <option value="BTC">BTC</option>
                        </select>
                </div>
                <div className="form-group col-xs-4">
                        <label for="condition">Condition</label>
                        <select id="condition" class="form-control" value={this.state.condition} onChange={(e) => this.handleCondSelect(e)}>
                            <option value="none">Choose...</option>
                            <option value="less than">less than</option>
                            <option value="greater than">greater than</option>
                        </select>
                </div>
                <div className="form-group col-xs-4">
                    <label for="inputEmail4">Price/Block Point</label>
                    <input type="text" class="form-control" id="point" placeholder="0" value={this.state.price_point} onChange={this.handleChange} />
                </div>
            </div>
            <button type="submit" class="btn btn-primary" onClick = {(e) => this.handleFormSubmit(e)}>Subscribe</button>
        </form>    
        )
    }
}

export default Subscriber
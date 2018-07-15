import React from 'react';
import { handleDeleteRow } from '../actions/rowActions';
import { REST_URL } from '../constants';
import axios from 'axios';
import Info from '../info_data.js';
var keygen = 0;

class Subscriber extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            watch : "",
            condition : "",
            choice: "",
            price_point : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCondSelect = this.handleCondSelect.bind(this);
        this.handleWatchSelect = this.handleWatchSelect.bind(this);
        this.handleSubmit = this.handleFormSubmit.bind(this);
        this.handleChoiceSelect = this.handleChoiceSelect.bind(this)
    }

    handleFormSubmit(event){
        event.preventDefault();
        let condition = ""
        if(this.state.condition === "greater than"){
            condition = ">"
        }
        if(this.state.condition === "less than"){
            condition = "<"
        }
        let post_url = "http://localhost:8888/notify";
        let post_body = {}
        if(this.state.choice === "block"){
            post_body = {
                watch: this.state.watch,
                condition: condition,
                block: this.state.price_point
              }
        }else{
            post_body = {
                watch: this.state.watch,
                condition: condition,
                price: this.state.price_point
              }
        }
        axios.post(post_url, post_body)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
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

    handleChoiceSelect(event){
        this.setState({choice : event.target.value})
    }

    createOptions(info, id){
        var info_array = [];
        let text;
        for(let i = 0 ; i < info.length ; i++){
            if(id === "first"){text = info[i].first}
            if(id === "symbol"){text = info[i].symbol;}
            if(id === "unit"){text = info[i].unit;}
            if(id === "exchange"){text = info[i].exchange;}
            if(id === "interval"){text = info[i].interval;}
            if(id === "block-symbol"){text = info[i].coin}
            if(id === "block-datatype"){text = info[i].datatype}
            if(id === "block-interval"){text = info[i].interval}
            if(!info_array.includes(text)){
                info_array.push(text);
            }
        }
        info_array.sort();
        return info_array;
    };

    render(){
        let prices = this.createOptions(Info.info_json.price,"symbol")
        let blocks = this.createOptions(Info.info_json.block,"block-symbol")
        let priceItems = prices.map((item) =>
            <option key={keygen++}>{item}</option>);
        let blockItems = blocks.map((item) =>
            <option key={keygen++}>{item}</option>);
        priceItems = priceItems.concat(blockItems)


        return(
        <form>
            <div className="form-row">
                <div className="form-group col-xs-4">
                        <label htmlFor="watch">Instr. to Watch:</label>
                        <select id="watch" className="form-control" value={this.state.watch} onChange={(e) => this.handleWatchSelect(e)}>
                            {priceItems}
                        </select>
                </div>
                <div className="form-group col-xs-4">
                        <label htmlFor="condition">What to Look for:</label>
                        <select id="condition" className="form-control" value={this.state.choice} onChange={(e) => this.handleChoiceSelect(e)}>
                            <option value="none">Choose...</option>
                            <option value="less than">Price</option>
                            <option value="greater than">Block</option>
                        </select>
                </div>
                <div className="form-group col-xs-4">
                        <label htmlFor="condition">Condition:</label>
                        <select id="condition" className="form-control" value={this.state.condition} onChange={(e) => this.handleCondSelect(e)}>
                            <option value="none">Choose...</option>
                            <option value="less than">less than</option>
                            <option value="greater than">greater than</option>
                        </select>
                </div>
                <div className="form-group col-xs-4">
                    <label htmlFor="inputEmail4">Price/Block Point:</label>
                    <input type="text" className="form-control" id="point" placeholder="0" value={this.state.price_point} onChange={this.handleChange} />
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick = {(e) => this.handleFormSubmit(e)}>Subscribe</button>
        </form>    
        )
    }
}

export default Subscriber
import React from 'react';
import { REST_URL } from './constants';
import Select from './Select.js';
import Buttons from './Buttons.js';

class Dropdowns extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            prices : [], //the data recieved about prices from fetch call
            blocks : [], //the data recieved about blocks from fetch call
            options : [], //the options for the dropdown filtered from prices or blocks
            id : "", //for the current Select that is enabled what is it ? symbol, unit,exchange etc.
            label : "", // for the curent Select that is enabled what is it? symbol, unit, exhchange, etc.
            symbol : "", //the following states we will keep track of the slection and if that select is enabled or not.  
            symbol_enabled : true,
            unit : "",
            unit_enabled : false,
            exchange : "",
            exchange_enabled : false,
            interval : "",
            interval_enabled : false
        };

        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.enableDropDown = this.enableDropdown.bind(this);
        this.disableDropdown = this.disableDropdown.bind(this);
    }

    handlePriceChange(prices, options, key, value){

        const nextKey = {"symbol" : "unit", "unit" : "exchange", "exchange" : "interval"}

        if(key === "symbol"){ // this means you are done with the symbol select
            this.setState({prices : prices, options : options, symbol : value, symbol_enabled : false, unit_enabled: true});
            this.disableDropdown(key)
            this.enableDropdown(nextKey[key])

        }else if(key === "unit"){
            this.setState({prices : prices, options : options, unit : value, unit_enabled : false, exchange_enabled : true});
            this.disableDropdown(key)
            this.enableDropdown(nextKey[key])

        }else if(key === "exchange"){
            this.setState({prices : prices, options : options, exchange : value, exhange_enabled : false, interval_enabled : true});
            this.disableDropdown(key)
            this.enableDropdown(nextKey[key])

        }else if(key === "interval"){
            this.setState({prices : prices, options : options, interval : value, interval_enabled : false, exchange_enabled : false});
            this.disableDropdown(key)
        }        
    }

    enableDropdown(select){
        let select_label = select + "-label-react"
        let arrow_label = select + "-arrow-react"
        let x_label = select + "-x-react"
        document.getElementById(select + "-react").disabled = false
        document.getElementById(arrow_label).classList.add("glyphicon", "glyphicon-arrow-right");
        document.getElementById(x_label).classList.add("glyphicon", "glyphicon-remove");
        document.getElementById(select_label).style.color = "black"
    }

    disableDropdown(select){
        let select_label = select + "-label-react"
        let arrow_label = select + "-arrow-react"
        let x_label = select + "-x-react"
        document.getElementById(arrow_label).classList.remove("glyphicon", "glyphicon-arrow-right");
        document.getElementById(select + "-react").disabled = true
        document.getElementById(select_label).style.color = "silver"
        document.getElementById(x_label).classList.remove("glyphicon", "glyphicon-remove");
    }   

    componentDidMount(){
            let url= REST_URL + "/info"
            var prices;
            var blocks;

            let currentComponent = this;
             fetch(url)
             .then(
             function(response) {
                 if (response.status !== 200) {
                 console.log('Looks like there was a problem. Status Code: ' +
                     response.status);
                     return;
                     }
                     response.json().then(function(data){
                         prices = data.price;
                         prices = eliminateNulls(prices)
                         blocks = data.block;
                         //set the state for initial conditions i.e. where the symbol Select is enabled with its options
                         currentComponent.setState({
                            prices : prices,
                            blocks : blocks,
                            options : createOptions(prices, "symbol"), //I need an array of just symbols.
                            symbol_enabled : true
                        });
                     });
                     }
                 )
                     .catch(function(err) {
                         console.log('Fetch Error :-S', err);
                     });


          function createOptions(info, id){
                var info_array = [];
                let text;
                for(let i = 0 ; i < info.length ; i++){
                    if(id === "first"){text = info[i].first}
                    if(id === "symbol"){text = info[i].symbol;}
                    if(id === "unit"){text = info[i].unit;}
                    if(id === "exchange"){text = info[i].exchange;}
                    if(id === "interval"){text = info[i].interval;}
                    if(!info_array.includes(text)){
                        info_array.push(text);
                    }
                }
                info_array.sort();
                return info_array;
            };

            function eliminateNulls(info){
                for(let i = 0 ; i < info.length ; i++){
                    if (info[i].exchange == null){
                        info[i].exchange = "Aggregated"
                    }
                }
                    return info 
                };
            }
    
    render() {
        return (
            <div>
                <Select enabled = {this.state.symbol_enabled} symbol = {this.state.symbol} prices = {this.state.prices} blocks = {this.state.blocks} options = {this.state.options} id = "symbol" label = "Symbols" onPriceChange = {this.handlePriceChange} />
                <Select enabled = {this.state.unit_enabled} unit = {this.state.unit} prices = {this.state.prices} blocks  = {this.state.blocks} options = {this.state.options} id = "unit" label = "Units" onPriceChange = {this.handlePriceChange} />
                <Select enabled = {this.state.exchange_enabled} exchange = {this.state.exchange} prices = {this.state.prices} blocks  = {this.state.blocks} options = {this.state.options} id = "exchange" label = "Exchange" onPriceChange = {this.handlePriceChange} />
                <Select enabled = {this.state.interval_enabled} interval = {this.state.interval} prices = {this.state.prices} blocks  = {this.state.blocks} options = {this.state.options} id = "interval" label = "Averaging" onPriceChange = {this.handlePriceChange} />
                <Buttons />
            </div>

        )
    }
}

export default Dropdowns;
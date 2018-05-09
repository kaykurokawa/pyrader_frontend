import React from 'react';
import { REST_URL } from './constants';
import Select from './Select.js';

class Dropdowns extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            prices : [],
            blocks : [],
            options : [],
            id : "",
            label : "",
            symbol : "",
            unit : "",
            exchange : "",
            interval : "",

        };

        this.handlePriceChange = this.handlePriceChange.bind(this);

    }

    handlePriceChange(prices, options, key, value){
        if(key === "symbol"){
            this.setState({prices : prices, options : options, symbol : value });    
        }else if(key === "unit"){
            this.setState({prices : prices, options : options, unit : value });  
        }else if(key === "exchange"){
            this.setState({prices : prices, options : options, exchange : value });
        }else if(key === "interval"){
            this.setState({prices : prices, options : options, interval : value });
        }
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
                     response.json().then(function(data) {
                         prices = data.price;
                         prices = eliminateNulls(prices)
                         blocks = data.block;
                         currentComponent.setState({
                            prices : prices,
                            blocks : blocks,
                            options : createOptions(prices, "symbol"), //I need an array of just symbols.
                            id : "symbol",
                            label : "Symbols"
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
                <Select enabled = {true} symbol = {this.state.symbol} prices = {this.state.prices} blocks = {this.state.blocks} options = {this.state.options} id = "symbol" label = "Symbols" onPriceChange = {this.handlePriceChange} />
                <Select enabled = {false} unit = {this.state.unit} prices = {this.state.prices} blocks  = {this.state.blocks} options = {this.state.options} id = "unit" label = "Units" onPriceChange = {this.handlePriceChange} />
                <Select enabled = {false} exchange = {this.state.exchange} prices = {this.state.prices} blocks  = {this.state.blocks} options = {this.state.options} id = "exchange" label = "Exchange" onPriceChange = {this.handlePriceChange} />
                <Select enabled = {false} interval = {this.state.interval} prices = {this.state.prices} blocks  = {this.state.blocks} options = {this.state.options} id = "interval" label = "Averaging" onPriceChange = {this.handlePriceChange} />
            </div>
        )
    }
}

export default Dropdowns;
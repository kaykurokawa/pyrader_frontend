import React from 'react';
import { REST_URL } from './constants';
import Select from './Select.js';
import Buttons from './Buttons.js';

class Dropdowns extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            price_mode : true,
            price_mode_enabled : true,
            prices : [], //the data recieved about prices from fetch call
            blocks : [], //the data recieved about blocks from fetch call
            options : [], //the options for the dropdown filtered from prices or blocks
            block_options : [],
            id : "", //for the current Select that is enabled what is it ? symbol, unit,exchange etc.
            label : "", // for the curent Select that is enabled what is it? symbol, unit, exhchange, etc.
            symbol : "", //the following states we will keep track of the selection and if that select is enabled or not.  
            symbol_enabled : false, //controls whether the symbol select is enabled or not
            unit : "",
            unit_enabled : false,
            exchange : "",
            exchange_enabled : false,
            interval : "",
            interval_enabled : false,
            block_symbol : "",
            block_symbol_enabled : true,
            block_datatype : "",
            block_datatype_enabled : false,
            block_interval : "",
            block_interval_enabled : false,
            reset : false // triggers true when reset is clicked and sets all selects to restart
        };

        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.enableDropDown = this.enableDropdown.bind(this);
        this.disableDropdown = this.disableDropdown.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleBlockChange = this.handleBlockChange.bind(this);
        this.handlePriceMode = this.handlePriceMode.bind(this);
        this.handlePriceCancel = this.handlePriceCancel.bind(this);
    }

    handlePriceChange(prices, options, key, value){

        const nextKey = {"symbol" : "unit", "unit" : "exchange", "exchange" : "interval"}

        if(key === "symbol"){ // this means you are done with the symbol select
            this.setState({prices : prices, options : options, symbol : value, symbol_enabled : false, unit_enabled: true, exchange_enabled: false, interval_enabled : false});
        }else if(key === "unit"){
            this.setState({prices : prices, options : options, unit : value, symbol_enabled : false, unit_enabled : false, exchange_enabled : true, interval_enabled : false});
  
        }else if(key === "exchange"){
            this.setState({prices : prices, options : options, exchange : value, symbol_enabled : false, unit_enabled : false, exchange_enabled : false, interval_enabled : true});

        }else if(key === "interval"){
            this.setState({prices : prices, options : options, interval : value, symbol_enabled : false, unit_enabled : false, interval_enabled : false, exchange_enabled : false});
        }        
    }

    handlePriceCancel(id, prices, options){
        
        if(id === "symbol"){ // this means you are done with the symbol select
            this.setState({price_mode_enabled : true, symbol_enabled: false, prices : prices, options : options});

        }else if(id === "unit"){
            this.setState({symbol_enabled: true, unit_enabled : false, prices : prices, options : options});
  
        }else if(id === "exchange"){
            this.setState({unit_enabled : true, exchange_enabled : false, prices : prices, options : options});

        }else if(id === "interval"){
            this.setState({exhcange_enabled : true, interval_enabled : false, prices : prices, options : options});
        }        
    }

    handleBlockChange(){

    }

    handlePriceMode(bool){
        if(bool){
            this.setState({price_mode : bool, price_field : "Price", price_mode_enabled: false, symbol_enabled : true})
        }else{
            this.setState({price_mode : bool , price_field : "Block", price_mode_enabled: false, symbol_enabled :true})
        }
    }

    handleReset(bool){
        this.setState({reset: bool});
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
            var initial_prices;

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
                         initial_prices = prices
                         blocks = data.block;
                         //set the state for initial conditions i.e. where the symbol Select is enabled with its options
                         currentComponent.setState({
                            prices : prices,
                            block : blocks,
                            options : createOptions(prices, "symbol"), //I need an array of just symbols.
                            block_options : createOptions(blocks, "block-symbol"),
                        });
                     });
                     }
                 )
                     .catch(function(err) {
                         console.log('Fetch Error :-S', err);
                     });

        /*given info array of objects and string id populate the dropdowns with the info of type id. */
          function createOptions(info, id){
                var info_array = [];
                let text;
                for(let i = 0 ; i < info.length ; i++){
                    if(id === "first"){text = info[i].first}
                    if(id === "symbol"){text = info[i].symbol;}
                    if(id === "unit"){text = info[i].unit;}
                    if(id === "exchange"){text = info[i].exchange;}
                    if(id === "interval"){text = info[i].interval;}
                    if(id === "block-symbol"){text = info[i].coin}
                    if(id === "block-datatype"){text = info[i].coin}
                    if(id === "block-interval"){text = info[i].interval}
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

            document.querySelector('#reset-react').onclick  = function(event){
                    currentComponent.setState({
                        reset : true,
                        price_mode_enabled : true,
                        symbol_enabled: false, 
                        unit_enabled : false, 
                        exchange_enabled : false, 
                        interval_enabled : false,
                        prices : initial_prices,
                        symbol : "", //the following states we will keep track of the selection and if that select is enabled or not.  
                        unit : "",  
                        exchange : "",
                        interval : "",
                        options : createOptions(initial_prices,"symbol") //set states to originial
                    });  
                    
                }
            }
    
    render() {
        let selectRows;
        if(this.state.price_mode === true){
            selectRows = 
                <div>
                    <Select enabled = {this.state.symbol_enabled} reset = {this.state.reset} symbol = {this.state.symbol} 
                        prices = {this.state.prices} options = {this.state.options} id = "symbol" 
                        label = "Symbols" onPriceChange = {this.handlePriceChange} onReset = {this.handleReset} onPriceMode = {this.handlePriceMode} onPriceCancel = {this.handlePriceCancel}/>

                    <Select enabled = {this.state.unit_enabled} reset = {this.state.reset} unit = {this.state.unit} 
                        prices = {this.state.prices} options = {this.state.options} 
                        id = "unit" label = "Units" onPriceChange = {this.handlePriceChange} onReset = {this.handleReset} onPriceMode = {this.handlePriceMode} onPriceCancel = {this.handlePriceCancel}/>

                    <Select enabled = {this.state.exchange_enabled} reset = {this.state.reset} exchange = {this.state.exchange} 
                        prices = {this.state.prices} options = {this.state.options} 
                        id = "exchange" label = "Exchange" onPriceChange = {this.handlePriceChange}  onReset = {this.handleReset} onPriceMode = {this.handlePriceMode} onPriceCancel = {this.handlePriceCancel}/>

                    <Select enabled = {this.state.interval_enabled} reset = {this.state.reset} interval = {this.state.interval} 
                        prices = {this.state.prices} options = {this.state.options} 
                        id = "interval" label = "Averaging" onPriceChange = {this.handlePriceChange}  onReset = {this.handleReset} onPriceMode = {this.handlePriceMode} onPriceCancel = {this.handlePriceCancel}/>
                    <Buttons />
                </div>
   
        }else{
            selectRows = 
            <div>
                <Select enabled = {this.state.block_symbol_enabled} reset = {this.state.reset} block-symbol = {this.state.block_symbol } 
                    blocks = {this.state.blocks} options = {this.state.block_options} id = "block-symbol" 
                    label = "Symbols" onBlockChange = {this.handleBlockChange} onReset = {this.handleReset} onPriceMode = {this.handlePriceMode} />

                <Select enabled = {this.state.block_datatype_enabled} reset = {this.state.reset} block-datatype = {this.state.block_symbol} 
                    blocks = {this.state.blocks} options = {this.state.block_options} id = "block-datatype" 
                    label = "Datatype" onBlockChange = {this.handleBlockChange} onReset = {this.handleReset} onPriceMode = {this.handlePriceMode} />

                <Select enabled = {this.state.block_interval_enabled} reset = {this.state.reset} block-interval = {this.state.block_interval} 
                    blocks = {this.state.blocks} options = {this.state.block_options} id = "block-interval" 
                    label = "Averaging" onBlockChange = {this.handleBlockChange} onReset = {this.handleReset} onPriceMode = {this.handlePriceMode} />
                <Buttons />
            </div>
        }
        console.log(this.state.block)
        return (
        <div>
            <Select enabled = {this.state.price_mode_enabled} options= {["Price", "Block"]} id = "price-or-block" label = "Price or Block" priceMode = {this.state.price_mode} onPriceMode = {this.handlePriceMode} />
            {selectRows}
        </div>
        )
    }
}

export default Dropdowns;
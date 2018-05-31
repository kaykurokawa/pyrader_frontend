import React from 'react';
import Select from './Select.js';
import Buttons from './Buttons.js';
import Info from '../info_data.js'

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
            submit_enabled : false,
            block_symbol : "",
            block_symbol_enabled : true,
            block_datatype : "",
            block_datatype_enabled : false,
            block_interval : "",
            block_interval_enabled : false,
        };

        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.enableDropDown = this.enableDropdown.bind(this);
        this.disableDropdown = this.disableDropdown.bind(this);
        this.handleBlockChange = this.handleBlockChange.bind(this);
        this.handlePriceMode = this.handlePriceMode.bind(this);
        this.handlePriceCancel = this.handlePriceCancel.bind(this);
        this.handleBlockChange = this.handleBlockChange.bind(this);
        this.handleButtonCancel = this.handleButtonCancel.bind(this);
        this.handleBlockCancel = this.handleBlockCancel.bind(this)
    }

    handlePriceChange(prices, options, key, value){
        let current = this.state.prices
        current.push(prices)

        let curr_op = this.state.options
        curr_op.push(options)

        if(key === "symbol"){ // this means you are done with the symbol select 
            this.setState({prices : current, options : curr_op, symbol : value, symbol_enabled : false, unit_enabled: true, exchange_enabled: false, interval_enabled : false});
        }else if(key === "unit"){
            this.setState({prices : current, options : curr_op, unit : value, symbol_enabled : false, unit_enabled : false, exchange_enabled : true, interval_enabled : false});
  
        }else if(key === "exchange"){
            this.setState({prices : current, options : curr_op, exchange : value, symbol_enabled : false, unit_enabled : false, exchange_enabled : false, interval_enabled : true});

        }else if(key === "interval"){
            this.setState({prices : current, options : curr_op, interval : value, symbol_enabled : false, unit_enabled : false, interval_enabled : false, exchange_enabled : false, submit_enabled : true});
        }        
    }

    handleButtonCancel(id){
        if(id === "price"){
            let current = this.state.prices
            current.pop()
            let prev = current
            let options = this.state.options
            options.pop()
            let prev_op = options
            this.setState({prices : prev, options : prev_op, symbol_enabled : false, unit_enabled : false, exchange_enabled : false,  interval_enabled : true, submit_enabled : false});
        }
        if(id === "block"){
            let current = this.state.blocks
            current.pop()
            let prev = current
            let options = this.state.block_options
            options.pop()
            let prev_op = options
            this.setState({blocks : prev, block_options : prev_op, block_interval_enabled : true, submit_enabled : false});
        }
    }

    handleBlockChange(blocks, options, id, value){
        let current = this.state.blocks
        current.push(blocks)

        let curr_op = this.state.block_options
        curr_op.push(options)

        if(id === "block-symbol"){            
            this.setState({blocks : current, block_options : curr_op, block_symbol : value, block_symbol_enabled : false, block_datatype_enabled: true});
        }else if(id === "block-datatype"){
            this.setState({blocks : current, block_options : curr_op, block_datatype : value, block_datatype_enabled : false, block_interval_enabled: true});
        }else if(id === "block-interval"){
            this.setState({blocks : current, block_options : curr_op, block_interval : value, block_datatype_enabled : false, block_interval_enabled : false, submit_enabled : true});
        }
    }

    handlePriceCancel(id){
      if(id !== "symbol"){
        let current = this.state.prices
        current.pop()
        var prev = current
        let options = this.state.options
        options.pop()
        var prev_op = options      
      }

        if(id === "symbol"){ // this means you are done with the symbol select, 
                            //also for this condition consider the fact  that you may be goin to
            this.setState({price_mode_enabled : true, symbol_enabled: false, symbol : ""});

        }else if(id === "unit"){
            this.setState({symbol_enabled: true, unit_enabled : false, unit : "", prices : prev, options : prev_op});
  
        }else if(id === "exchange"){
            this.setState({unit_enabled : true, exchange_enabled : false, exchange : "", prices : prev, options : prev_op});

        }else if(id === "interval"){
            this.setState({exchange_enabled : true, interval_enabled : false, interval : "", prices : prev, options : prev_op});
        }        
    }

    handleBlockCancel(id){
        if(id !== "block-symbol"){
            let current = this.state.blocks
            current.pop()
            var prev = current
            let options = this.state.block_options
            options.pop()
            var prev_op = options
        }

        if(id === "block-symbol"){ // this means you are done with the symbol select
            this.setState({price_mode_enabled : true, block_symbol_enabled: false, block_symbol : ""});

        }else if(id === "block-datatype"){
            this.setState({block_symbol_enabled: true, block_datatype_enabled : false, block_datatype : "", blocks : prev, block_options : prev_op});
  
        }else if(id === "block-interval"){
            this.setState({block_datatype_enabled : true, block_interval_enabled : false, block_interval : "", blocks : prev, block_options : prev_op});
        }
    }

    handlePriceMode(bool){
        if(bool){
            this.setState({price_mode : bool, price_mode_enabled: false, symbol_enabled : true})
        }else{
            this.setState({price_mode : bool , price_mode_enabled: false, block_symbol_enabled :true})
        }
    }

    enableDropdown(select){
        let select_label = select + "-label"
        let arrow_label = select + "-arrow"
        let x_label = select + "-x"
        document.getElementById(select).disabled = false
        document.getElementById(arrow_label).classList.add("glyphicon", "glyphicon-arrow-right");
        document.getElementById(x_label).classList.add("glyphicon", "glyphicon-remove");
        document.getElementById(select_label).style.color = "black"
    }

    disableDropdown(select){
        let select_label = select + "-label"
        let arrow_label = select + "-arrow"
        let x_label = select + "-x"
        document.getElementById(arrow_label).classList.remove("glyphicon", "glyphicon-arrow-right");
        document.getElementById(select).disabled = true
        document.getElementById(select_label).style.color = "silver"
        document.getElementById(x_label).classList.remove("glyphicon", "glyphicon-remove");
    }   

    componentDidMount(){
            var prices;
            var blocks;
            var initial_prices;
            var initial_blocks

            var currentComponent = this;
            let data = Info.info_json;
            prices = data.price;
            prices = eliminateNulls(prices)
            initial_prices = prices
            blocks = data.block;
            initial_blocks = blocks
            //set the state for initial conditions i.e. where the symbol Select is enabled with its options
            currentComponent.setState({
                prices : [prices],
                blocks : [blocks],
                options : [createOptions(prices, "symbol")], //I need an array of just symbols.
                block_options : [createOptions(blocks, "block-symbol")],
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
                    if(id === "block-datatype"){text = info[i].datatype}
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
            document.querySelector('#reset').onclick = () => {
                handleReset();
            }

            document.querySelector('#block-reset').onclick = () => {
                handleReset();
            }

            function handleReset(){
                currentComponent.setState({
                    submit_enabled : false,
                    price_mode_enabled : true,
                    symbol_enabled: false, 
                    unit_enabled : false, 
                    exchange_enabled : false, 
                    interval_enabled : false,
                    block_symbol_enabled : false,
                    block_datatype_enabled : false,
                    block_interval_enabled : false,
                    prices : [initial_prices],
                    blocks : [initial_blocks],
                    symbol : "", //the following states we will keep track of the selection and if that select is enabled or not.  
                    unit : "",  
                    exchange : "",
                    interval : "",
                    block_symbol : "",
                    block_interval : "",
                    block_datatype : "",
                    options : [createOptions(initial_prices,"symbol")], //set states to originial
                    block_options : [createOptions(initial_blocks, "block-symbol")]
                });   
            }
            document.querySelector('#submit').addEventListener("click", () => {
                handleSubmit();
            }, false)

            document.querySelector('#block-submit').addEventListener("click", () => {
                handleSubmit();
            }, false)

            function handleSubmit(){
                currentComponent.setState({
                    price_mode_enabled : true,
                    symbol_enabled: false, 
                    unit_enabled : false, 
                    exchange_enabled : false, 
                    interval_enabled : false,
                    block_symbol_enabled : false,
                    block_datatype_enabled : false,
                    block_interval_enabled : false,
                    submit_enabled : false,
                    prices : [initial_prices],
                    blocks : [initial_blocks],
                    options : [createOptions(initial_prices,"symbol")], //set states to originial
                    block_options : [createOptions(initial_blocks, "block-symbol")]
                });
            }
        }
    
    render() {
        let selectRows;
        if(this.state.price_mode === true){
            selectRows = 
                <div>
                    <Select enabled = {this.state.symbol_enabled}  symbol = {this.state.symbol} 
                        prices = {this.state.prices[this.state.prices.length-1]} options = {this.state.options[this.state.options.length-1]} id = "symbol" 
                        label = "Symbols" onPriceChange = {this.handlePriceChange} onPriceMode = {this.handlePriceMode} onPriceCancel = {this.handlePriceCancel}/>

                    <Select enabled = {this.state.unit_enabled}  unit = {this.state.unit} 
                        prices = {this.state.prices[this.state.prices.length-1]} options = {this.state.options[this.state.options.length-1]} 
                        id = "unit" label = "Units" onPriceChange = {this.handlePriceChange}  onPriceMode = {this.handlePriceMode} onPriceCancel = {this.handlePriceCancel}/>

                    <Select enabled = {this.state.exchange_enabled}  exchange = {this.state.exchange} 
                        prices = {this.state.prices[this.state.prices.length-1]} options = {this.state.options[this.state.options.length-1]} 
                        id = "exchange" label = "Exchange" onPriceChange = {this.handlePriceChange}   onPriceMode = {this.handlePriceMode} onPriceCancel = {this.handlePriceCancel}/>

                    <Select enabled = {this.state.interval_enabled}  interval = {this.state.interval} 
                        prices = {this.state.prices[this.state.prices.length-1]} options = {this.state.options[this.state.options.length-1]} 
                        id = "interval" label = "Averaging" onPriceChange = {this.handlePriceChange}   onPriceMode = {this.handlePriceMode} onPriceCancel = {this.handlePriceCancel}/>
                </div>
   
        }else{
            selectRows = 
            <div>
                <Select enabled = {this.state.block_symbol_enabled} block_symbol = {this.state.block_symbol} 
                    blocks = {this.state.blocks[this.state.blocks.length-1]} options = {this.state.block_options[this.state.block_options.length-1]} id = "block-symbol" 
                    label = "Symbols" onBlockChange = {this.handleBlockChange} onPriceMode = {this.handlePriceMode} onBlockCancel = {this.handleBlockCancel}/>

                <Select enabled = {this.state.block_datatype_enabled}  block_datatype = {this.state.block_datatype} 
                    blocks = {this.state.blocks[this.state.blocks.length-1]} options = {this.state.block_options[this.state.block_options.length-1]} id = "block-datatype" 
                    label = "Datatype" onBlockChange = {this.handleBlockChange} onPriceMode = {this.handlePriceMode} onBlockCancel = {this.handleBlockCancel} />

                <Select enabled = {this.state.block_interval_enabled} block_interval = {this.state.block_interval} 
                    blocks = {this.state.blocks[this.state.blocks.length-1]} options = {this.state.block_options[this.state.block_options.length-1]} id = "block-interval" 
                    label = "Averaging" onBlockChange = {this.handleBlockChange} onPriceMode = {this.handlePriceMode} onBlockCancel = {this.handleBlockCancel} />
            </div>
        }

        return (
        <div>
            <Select enabled = {this.state.price_mode_enabled} options= {["Price", "Block"]} id = "price-or-block" label = "Price/Block" priceMode = {this.state.price_mode} onPriceMode = {this.handlePriceMode} />
            {selectRows}
            <Buttons  enabled = {this.state.submit_enabled} onCancel = {this.handleButtonCancel} priceMode = {this.state.price_mode} />
        </div>
        )
    }
}

export default Dropdowns;
import React from 'react';
import { MICRO } from './constants';
import PropTypes from 'prop-types'
var key_gen = 0;

class Select extends React.Component{
    constructor(props){
        super(props);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handlePriceOrBlock = this.handlePriceOrBlock.bind(this);
        this.handlePriceCancel = this.handlePriceCancel.bind(this);
        this.handleBlockChange = this.handleBlockChange.bind(this);
        this.handleBlockCancel = this.handleBlockCancel.bind(this);
    }
    
    handlePriceOrBlock(bool){
        this.props.onPriceMode(bool);
    }

    handlePriceChange(prices, options,id,choice) {
        this.props.onPriceChange(prices, options,id,choice);
    }
  
    handleBlockChange(blocks, options, id, value){
        this.props.onBlockChange(blocks, options, id, value);
    }

    handleReset(bool){
        this.props.onReset(bool);
    }

    handlePriceCancel(id){
        this.props.onPriceCancel(id);
    }

    handleBlockCancel(id){
        this.props.onBlockCancel(id);
    }

    componentDidUpdate(){
        const nextKey = {"symbol" : "unit", "unit" : "exchange", "exchange" : "interval", 
            "block-symbol" : "block-datatype", "block-datatype" : "block-interval"}
        //const prevKey= {"symbol" : "price-or-block" , "unit" : "symbol", "exchange" : "unit", "interval" : "exchange",
         //   "block-symbol" : "price-or-block", "block-datatype" : "block-symbol", "block-interval" : "block-datatype"}
        let id = this.props.id;
        var currentComponent = this;
        var current = currentComponent.props.prices
        var current_block = currentComponent.props.blocks
        let tag = document.querySelector("#" + id);

        if(this.props.enabled === true){
            enableDropdown(id)
        }else{
            disableDropdown(id)
        }

        if(id !== "price-or-block"){
        //1. filter prices array by current dropdwon
            tag.onchange = function(event){ 
                var choice = document.getElementById(id).value;
                if(id === "symbol"){
                    current = current.filter(line => line.symbol.includes(choice));
                }else if(id === "unit"){
                    current = current.filter(line => line.unit.includes(choice));
                }else if(id === "exchange"){
                    current = current.filter(line => line.exchange.includes(choice));
                }else if(id === "block-symbol"){
                    current_block = current_block.filter(line => line.coin.includes(choice));
                }else if(id === "block-datatype"){ 
                    current_block = current_block.filter(line => line.datatype.includes(choice));
                }
                if(!id.includes("block")){
                    let options = createOptions(current,nextKey[id]);
                    currentComponent.handlePriceChange(current, options, id, choice);
                }else{
                    let block_options = createOptions(current_block, nextKey[id]);
                    currentComponent.handleBlockChange(current_block, block_options, id, choice);
                }
                currentComponent.handleReset(false)
            }   
        }
        
        if(id === "price-or-block"){
            tag.onchange = function(event){
                let choice = document.getElementById(id).value;
                if(choice === "Price"){
                    currentComponent.handlePriceOrBlock(true);
                }else{
                    currentComponent.handlePriceOrBlock(false);
                }
            }
        }
        
        if(this.props.id !== 'price-or-block'){
            let cancel = document.querySelector("#" + id + "-x");                
            cancel.onclick = function(event){
                console.log("hi")
                if(currentComponent.props.onPriceCancel){
                    currentComponent.handlePriceCancel(id);
                }
                if(currentComponent.props.onBlockCancel){
                    currentComponent.handleBlockCancel(id);
                }
            } 
        }

        function enableDropdown(select){
            let select_label = select + "-label"
            let arrow_label = select + "-arrow"
            let x_label = select + "-x"
            document.getElementById(select).disabled = false
            document.getElementById(arrow_label).classList.add("glyphicon", "glyphicon-arrow-right");
            if(currentComponent.props.id !== 'price-or-block'){
                document.getElementById(x_label).classList.add("glyphicon", "glyphicon-remove");
            }
                document.getElementById(select_label).style.color = "black"
            }

        function disableDropdown(select){
            let select_label = select + "-label"
            let arrow_label = select + "-arrow"
            let x_label = select + "-x"
            document.getElementById(arrow_label).classList.remove("glyphicon", "glyphicon-arrow-right");
            document.getElementById(select).disabled = true
            document.getElementById(select_label).style.color = "silver"
            if(currentComponent.props.id !== 'price-or-block'){
                document.getElementById(x_label).classList.remove("glyphicon", "glyphicon-remove");
            }
        }


        function convertIntervalNumberToText(interval){
            if(interval/MICRO === 86400)
                return "day"
            if(interval/MICRO === 3600)
                return "hour"
            if(interval/MICRO === 300)
                return "5min"
            if(interval === 0)
                return "No Averaging"   
        };

        function createOptions(info, id){
            var info_array = [];
            let text;
            for(var i = 0 ; i < info.length ; i++){
                if(id === "first"){text = info[i].first}
                if(id === "symbol"){text = info[i].symbol;}
                if(id === "unit"){text = info[i].unit;}
                if(id === "exchange"){text = info[i].exchange;}
                if(id === "interval"){text = convertIntervalNumberToText(info[i].interval);}
                if(id === "block-symbol"){
                    text = info[i].coin;
                }
                if(id === "block-datatype"){
                    text = info[i].datatype; 
                }
                if(id === "block-interval"){text = convertIntervalNumberToText(info[i].interval);}
                if(!info_array.includes(text)){
                    info_array.push(text);
                }
            }
            info_array.sort();
            return info_array;
        };
        

    }

    render(){
        
        let optionItems;
        let select = document.getElementById(this.props.id)
        let id = this.props.id
        let firstOption = <option key={key_gen++}></option>;

        //if the select is disabled, then the options should be just the selected choice
        if(this.props.enabled === false){
            if(id === "symbol"){
                optionItems = <option key={key_gen++}>{this.props.symbol}</option>;
            }else if(id === "unit"){
                optionItems = <option key={key_gen++}>{this.props.unit}</option>;
            }else if(id === "exchange"){
                optionItems = <option key={key_gen++}>{this.props.exchange}</option>;
            }else if(id === "interval"){
                optionItems = <option key={key_gen++}>{this.props.interval}</option>;
            }else if(id === "price-or-block"){ 
                optionItems = <option key={key_gen++}>{this.props.priceMode ? "Price" : "Block"}</option>; 
            }else if(id === "block-symbol"){
                optionItems = <option key={key_gen++}>{this.props.block_symbol}</option>;
            }else if(id === "block-datatype"){
                optionItems = <option key={key_gen++}>{this.props.block_datatype}</option>;
            }else if(id === "block-interval"){
                optionItems = <option key={key_gen++}>{this.props.block_interval}</option>;
            }

        }else{
            //if select is enabled then the options should be a map of the options
            if(this.props.options){
                optionItems = this.props.options.map((item) =>
                <option key={key_gen++}>{item}</option>);
            }else if(this.props.block_options){
                optionItems = this.props.block_options.map((item) =>
                <option key={key_gen++}>{item}</option>);
            }
        }

        return(
            <div className="col-xs-2" id={this.props.id + "-div"}>
                <div className="row" >
                    <div className="col-xs-2 text-center">
                        {this.props.id !== 'price-or-block' ? 
                            ( <span id={this.props.id + "-x"}></span>) : 
                            (<span></span>)
                            }
                        <span id={this.props.id + "-arrow"}></span>
                    </div>
                        <div className="col-xs-8"> 
                            <label id={this.props.id + "-label"}>{this.props.label}</label>       
                            <select className="form-control" id = {this.props.id}>
                                {this.props.enabled || this.props.reset ? firstOption : "" }
                                {optionItems}
                            </select>
                    </div>
                </div>      
            </div>
        )
    }
}

Select.propTypes = {
    symbol : PropTypes.string,
    unit : PropTypes.string,
    exchange : PropTypes.string,
    interval : PropTypes.string,
    block_symbol :  PropTypes.string,
    block_datatype :  PropTypes.string,
    block_interval :  PropTypes.string,
    id :  PropTypes.string,
    enabled :  PropTypes.bool,
    priceMode : PropTypes.bool,


};

export default Select;

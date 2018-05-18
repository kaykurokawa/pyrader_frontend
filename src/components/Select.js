import React from 'react';
import { MICRO } from './constants';
var key_gen = 0;

class Select extends React.Component{
    constructor(props){
        super(props);
        this.handlePriceChange = this.handlePriceChange.bind(this)
    }

    handlePriceChange(prices, options,id,choice) {
        this.props.onPriceChange(prices, options,id,choice);
      }

    componentDidUpdate(){

        const nextKey = {"symbol" : "unit", "unit" : "exchange", "exchange" : "interval"}
        let id = this.props.id;
        let currentComponent = this;
        var current = currentComponent.props.prices
        let tag = document.querySelector("#" + id + "-react");
        currentComponent = this;
        if(this.props.enabled == true){
            enableDropdown(id)
        
        }else{
            disableDropdown(id)
        }

        //1. filter prices array by current dropdwon
        tag.onchange = function(event){ 
    
        let choice = document.getElementById(id + "-react").value;

            if(id === "symbol"){
                current = current.filter(line => line.symbol.includes(choice));
            }else if(id === "unit"){
                current = current.filter(line => line.unit.includes(choice));
            }else if(id === "exchange"){
                current = current.filter(line => line.exchange.includes(choice));
            }else{

            }
  
        //2. create  select options from it
        let options = createOptions(current, nextKey[id]);          
    
        //4. pass the state up to the container component for setState.
        currentComponent.handlePriceChange(current, options, id, choice);
        //5. set that dropdown to that value
            //see render method

        }
        
        function enableDropdown(select){
            let select_label = select + "-label-react"
            let arrow_label = select + "-arrow-react"
            let x_label = select + "-x-react"
            document.getElementById(select + "-react").disabled = false
            document.getElementById(arrow_label).classList.add("glyphicon", "glyphicon-arrow-right");
            document.getElementById(x_label).classList.add("glyphicon", "glyphicon-remove");
            document.getElementById(select_label).style.color = "black"
        }

        function disableDropdown(select){
            let select_label = select + "-label-react"
            let arrow_label = select + "-arrow-react"
            let x_label = select + "-x-react"
            document.getElementById(arrow_label).classList.remove("glyphicon", "glyphicon-arrow-right");
            document.getElementById(select + "-react").disabled = true
            document.getElementById(select_label).style.color = "silver"
            document.getElementById(x_label).classList.remove("glyphicon", "glyphicon-remove");
        }   

        function createOptions(info, id){
            var info_array = [];
            let text;
            for(var i = 0 ; i < info.length ; i++){
                if(id === "first"){text = info[i].first}
                if(id === "symbol"){text = info[i].symbol;}
                if(id === "unit"){text = info[i].unit;}
                if(id === "exchange"){text = info[i].exchange;}
                if(id === "interval"){text = convertIntervalNumberToText(info[i].interval);}
                if(!info_array.includes(text)){
                    info_array.push(text);
                }
            }
            info_array.sort();
            return info_array;
        };

        function convertIntervalNumberToText(interval){
            if(interval/MICRO === 86400)
                return "day"
            if(interval/MICRO === 3600)
                return "hour"
            if(interval/MICRO === 300)
                return "5min"
             if(interval === 0)
                return "No Averaging"   
        }
    }
    
    render(){
        
        let optionItems;
        let select = document.getElementById(this.props.id + "-react")
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
            }else{
                optionItems = <option key={key_gen++}></option>;
            }
        }else{
            //if select is enabled then the options should be a map of the options
            optionItems = this.props.options.map((item) =>
            <option key={key_gen++}>{item}</option>);
        }
        return(
            <div className="col-xs-2" id={this.props.id + "-div-react"}>
                <div className="row" >
                    <div className="col-xs-2 text-center">
                        <span id={this.props.id + "-arrow-react"}></span>
                        <span id={this.props.id + "-x-react"}></span>
                    </div>
                        <div className="col-xs-8"> 
                            <label id={this.props.id + "-label-react"}>{this.props.label}</label>       
                            <select className="form-control" id = {this.props.id + "-react"}>
                                {this.props.enabled ? firstOption : "" }
                                {optionItems}
                            </select>
                    </div>
                </div>      
            </div>
        )
    }
}

export default Select;

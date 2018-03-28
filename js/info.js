const constants = require('./constants.js')
        //Call Info API and pass information to dropdowns 
        function getInfo(){
            url= constants.REST_URL + "/info"
             fetch(url)
             .then(
             function(response) {
                 if (response.status !== 200) {
                 console.log('Looks like there was a problem. Status Code: ' +
                     response.status);
                     return;
                     }
                     response.json().then(function(data) {
                         processInfo(data.price)
                         processBlockInfo(data)
                     });
                     }
                 )
                     .catch(function(err) {
                         console.log('Fetch Error :-S', err);
                     });
         }


        function processInfo(price){
            info_prices = price
            info_prices = eliminateNulls(info_prices)
            n = price.length
            enableDropdown("symbol")

            var symbol = document.querySelector("#symbol")
            var unit = document.querySelector("#unit")
            var exchange = document.querySelector("#exchange")
            var interval = document.querySelector("#interval")
            var submit = document.querySelector("#submit")
            var reset = document.getElementById("reset") 
            enableDropdown("symbol")
            disableDropdown("unit")
            disableDropdown("exchange")
            disableDropdown("interval")
            createOptions(info_prices,"symbol")
            disableButton("submit")

        // given the id of the dropdown and the id of the next dropdwon in sequence, take care of all of the logic: enable, disable, load options...etc
        var states = []
        states.push(info_prices)

        function LoadOptions(id,prev_id,next_id){
            var tag = document.querySelector("#" + id)
            tag.onchange = function(event){
                current = states[states.length-1]
                if(id == "symbol"){
                    current = current.filter(line => line.symbol.includes(document.getElementById(id).value))
                }else if(id == "unit"){
                    current = current.filter(line => line.unit.includes(document.getElementById(id).value))
                }else if(id == "exchange"){
                    current = current.filter(line => line.exchange.includes(document.getElementById(id).value))
                }else{
                }
                    if(id == "interval"){
                        enableButton("submit")
                        disableDropdown("interval")
                    }else{
                        states.push(current)
                        enableDropdown(next_id)
                        console.log(current)
                        createOptions(states[states.length-1],next_id)
                        disableDropdown(id)

                        var cancel = document.querySelector("#" + next_id + "-x")                
                        cancel.onclick = function(event){
                            enableDropdown(id)
                            disableDropdown(next_id)
                            resetDropdown(next_id)
                            states.pop()
                        }
                    }
                }
        }
        
        LoadOptions("symbol","none","unit")
        LoadOptions("unit","symbol","exchange")
        LoadOptions("exchange","unit","interval")
        LoadOptions("interval","unit","none")
        
        /*interval.onchange  = function(event){
            info_prices_state = info_prices
            enableButton("submit")
            disableDropdown("interval")
            document.querySelector("#interval-x").onclick = function(event){
                enableDropdown("exchange")
                disableDropdown("interval")
                info_prices = into_prices_state
            }
        } */ 

        reset.onclick  = function(event){
            info_prices = price
            symbol.options.length = 1
            createOptions(info_prices,"symbol")
            enableDropdown("symbol")
            disableDropdown("unit")
            unit.options.length = 1
            disableDropdown("exchange")
            exchange.options.length = 1
            disableDropdown("interval")
            interval.options.length = 1
            disableButton("submit")
            states = []
            states.push(info_prices)
        }    
    }

        //get info from API and append to drop down menu for block charts
        function processBlockInfo(json){
            blocks = []
            blocks = json.block
            var m = json.block.length
            var block_symbol = document.getElementById("block-symbol")
            var block_datatype = document.getElementById("block-datatype")
            var block_interval = document.getElementById("block-interval")
            var block_submit = document.getElementById("block-submit")
            var block_reset = document.getElementById("block-reset") 
            enableDropdown("block-symbol")
            disableDropdown("block-datatype")
            disableDropdown("block-interval")
            createBlockOptions(blocks,"block-symbol")
            block_submit.disabled = true

            block_symbol.onchange = function(event){
                blocks = blocks.filter(line => line.coin.includes(document.getElementById("block-symbol").value))
                enableDropdown("block-datatype")
                createBlockOptions(blocks,"block-datatype")
                disableDropdown("block-symbol")
            }

            block_datatype.onchange = function(event){
                blocks = blocks.filter(line => line.datatype.includes(document.getElementById("block-datatype").value))
                enableDropdown("block-interval")
                createBlockOptions(blocks,"block-interval")
                disableDropdown("block-datatype")
            }

            block_interval.onchange  = function(event){
                enableButton("block-submit")
                disableDropdown("block-interval")
                blocks = json.block
            }

            block_reset.onclick  = function(event){
                blocks = json.block
                block_symbol.options.length = 1
                createBlockOptions(blocks,"block-symbol")
                enableDropdown("block-symbol")
                disableDropdown("block-datatype")
                block_datatype.options.length = 1
                disableDropdown("block-interval")
                block_interval.options.length = 1
                disableButton("block-submit")
            }      
            
        }

        function disableDropdown(select){
            select_label = select + "-label"
            arrow_label = select + "-arrow"
            x_label = select + "-x"
            document.getElementById(arrow_label).classList.remove("glyphicon", "glyphicon-arrow-right");
            document.getElementById(select).disabled = true
            document.getElementById(select_label).style.color = "silver"
            document.getElementById(x_label).classList.remove("glyphicon", "glyphicon-remove");
        }

        function resetDropdown(select){
            document.getElementById(select).options.length = 1
        }

        function enableDropdown(select){
            select_label = select + "-label"
            arrow_label = select + "-arrow"
            x_label = select + "-x"
            document.getElementById(select).disabled = false
            document.getElementById(arrow_label).classList.add("glyphicon", "glyphicon-arrow-right");
            document.getElementById(x_label).classList.add("glyphicon", "glyphicon-remove");
            //document.getElementById(select_label).style.color = "black"
            //document.getElementById(x_label).style.color = "red"
        }

        function enableButton(select){
            arrow_label = select + "-arrow"
            document.getElementById(select).disabled = false
            document.getElementById(arrow_label).classList.add("glyphicon", "glyphicon-arrow-right");
        }

        function disableButton(select){
            arrow_label = select + "-arrow"
            document.getElementById(arrow_label).classList.remove("glyphicon", "glyphicon-arrow-right");
            document.getElementById(select).disabled = true
        }



        //given info array of objects and string id populate the dropdowns with the info of type id. 
        function createOptions(info, id){
            array = []
            for(i = 0 ; i < info.length ; i++){
                if(id == "symbol"){text = info[i].symbol}
                if(id == "unit"){text = info[i].unit}
                if(id == "exchange"){text = info[i].exchange}
                if(id == "interval"){text = convertIntervalNumberToText(info[i].interval)}
                if(!array.includes(text)){
                    array.push(text)
                    option = document.createElement("option")
                    option.text = text
                    var select = document.getElementById(id);
                    select.appendChild(option); 
                }
            } 
            if(id == "interval"){
                option = document.createElement("option")
                option.text = "None"
                var select = document.getElementById(id);
                select.appendChild(option); 
            }
        }

        function createBlockOptions(info, id){
            array = []
            for(i = 0 ; i < info.length ; i++){
                if(id == "block-symbol"){text = info[i].coin}
                if(id == "block-datatype"){text = info[i].datatype}
                if(id == "block-interval"){text = convertIntervalNumberToText(info[i].interval)}
                if(!array.includes(text)){
                    array.push(text)
                    option = document.createElement("option")
                    option.text = text
                    var select = document.getElementById(id);
                    select.appendChild(option); 
                }
            }
            if(id == "block-interval"){
                option = document.createElement("option")
                option.text = "None"
                var select = document.getElementById(id);
                select.appendChild(option); 
            }
        }
        
        //given a number in miroseconds return if it is a day, hour, 5 min
        function convertIntervalNumberToText(interval){
            if(interval/constants.MICRO == 86400)
                return "day"
            if(interval/constants.MICRO == 3600)
                return "hour"
            if(interval/constants.MICRO == 300)
                return "5min"
             if(interval == 0)
                return "0"   
        }
        //given a info of prices change the exchanges from null to aggregated.
        function eliminateNulls(info){
            for(i = 0 ; i < info.length ; i++){
                if (info[i].exchange == null){
                    info[i].exchange = "Aggregated"
                }
            }
            return info 
        }


module.exports = {
        getInfo: getInfo,
        convertIntervalNumberToText : convertIntervalNumberToText,
        eliminateNulls: eliminateNulls,
}

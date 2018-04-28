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
                        resetDropdown("first");
                        setInitialFirst("first");
                        enableDropdown("first");
                        disableDropdown("symbol");
                        disableDropdown("unit");
                        disableDropdown("exchange");
                        disableDropdown("interval");
                        var first = document.querySelector("#first")
                        first.onchange = function(event){
                            disableDropdown("first");
                            var choice = document.getElementById("first").value
                            if(choice == "Block"){
                                renderBlockDropDowns();
                                processBlockInfo(data.block)
                            }
                            if(choice == "Price/Volume"){
                                renderPriceDropDowns();
                                processInfo(data.price);
                            }
                        }
                     });
                     }
                 )
                     .catch(function(err) {
                         console.log('Fetch Error :-S', err);
                     });
         }

         /*sets default for the first dropdown*/
         function setInitialFirst(id){
            let price_volume = document.createElement("option");
            price_volume.text = "Price/Volume";
            let block = document.createElement("option");
            block.text = "Block";
            let first = document.querySelector("#" + id);
            first.appendChild(block)
            first.appendChild(price_volume)
         }

        /*clear block dropdowns and display price/volume dropdowns*/
        function renderPriceDropDowns(){
            hideOption("block-symbol-div");
            hideOption("block-datatype-div");
            hideOption("block-interval-div");
            hideOption("block-submit-div");
            showOption("symbol-div");
            showOption("unit-div");
            showOption("exchange-div");
            showOption("interval-div");
            showOption("submit-div");
        }
        /*clear price/volume dropdown and display block dropdowns*/
        function renderBlockDropDowns(){
            hideOption("symbol-div");
            hideOption("unit-div");
            hideOption("exchange-div");
            hideOption("interval-div");
            hideOption("submit-div");
            showOption("block-symbol-div");
            showOption("block-datatype-div");
            showOption("block-interval-div");
            showOption("block-submit-div");
        }

        function hideOption(id){
            let select = document.querySelector("#" + id);
            select.style.display = "none";
        }

        function showOption(id){
            let select = document.querySelector("#" + id);
            select.style.display = "block";
        }

        function processInfo(price){
            var info_prices = price;
            var info_prices = eliminateNulls(info_prices);
            var first = document.querySelector("#first");
            var symbol = document.querySelector("#symbol");
            var unit = document.querySelector("#unit");
            var exchange = document.querySelector("#exchange");
            var interval = document.querySelector("#interval");
            var submit = document.querySelector("#submit");
            var reset = document.getElementById("reset");
            var submit_x = document.querySelector("#submit-x");
            var symbol_x = document.querySelector("#symbol-x");
            enableDropdown("symbol");
            symbol_x.onclick = function(event){
                document.getElementById("symbol-arrow").classList.remove("glyphicon", "glyphicon-arrow-right");
                enableDropdown("first");
                disableDropdown("symbol");
                resetDropdown("symbol");
                disableButton("submit");
                resetDropdown("first");
                createOptions([{first :"Price/Volume"},{first : "Block"}],"first");
                states = [];
            }
            disableDropdown("unit");
            disableDropdown("exchange");
            disableDropdown("interval");
            createOptions(info_prices,"symbol");
            disableButton("submit");

        // given the id of the dropdown and the id of the next dropdwon in sequence, take care of all of the logic: enable, disable, load options...etc
        var states = [];
        states.push(info_prices);
       
        function LoadOptions(id,prev_id,next_id){
             tag = document.querySelector("#" + id);
                tag.onchange = function(event){
                current = states[states.length-1];
                if(id == "symbol"){
                    current = current.filter(line => line.symbol.includes(document.getElementById(id).value));
                }else if(id == "unit"){
                    current = current.filter(line => line.unit.includes(document.getElementById(id).value));
                }else if(id == "exchange"){
                    current = current.filter(line => line.exchange.includes(document.getElementById(id).value));
                }else{
                }
                    if(id == "interval"){
                        enableButton("submit");
                        disableDropdown("interval");
                        
                        submit_x.classList.add("glyphicon", "glyphicon-remove");
                        submit_x.onclick = function(event){
                            document.getElementById("submit-arrow").classList.remove("glyphicon", "glyphicon-arrow-right");
                            enableDropdown("interval");
                            disableButton("submit");
                        }
                    }else{
                        states.push(current);
                        enableDropdown(next_id);
                        createOptions(states[states.length-1],next_id);
                        disableDropdown(id);
                        cancel = document.querySelector("#" + next_id + "-x");                
                        cancel.onclick = function(event){
                            enableDropdown(id);
                            disableDropdown(next_id);
                            resetDropdown(next_id);
                            states.pop();
                            resetDropdown(id);//delete all options of id
                            createOptions(states[states.length-1],id);//create them again
                        }
                    }
                }
        }
        
        LoadOptions("symbol","none","unit");
        LoadOptions("unit","symbol","exchange");
        LoadOptions("exchange","unit","interval");
        LoadOptions("interval","unit","none");

        reset.onclick  = function(event){
            info_prices = price;
            symbol.options.length = 1;
            createOptions(info_prices,"symbol");
            enableDropdown("symbol");
            disableDropdown("unit");
            unit.options.length = 1;
            disableDropdown("exchange");
            exchange.options.length = 1;
            disableDropdown("interval");
            interval.options.length = 1;
            disableButton("submit");
            states = [];
            states.push(info_prices);
        }

        submit.addEventListener("click", function(){
            info_prices = price;
            symbol.options.length = 1;
            createOptions(info_prices,"symbol");
            enableDropdown("symbol");
            disableDropdown("unit");
            unit.options.length = 1;
            disableDropdown("exchange");
            exchange.options.length = 1;
            disableDropdown("interval");
            interval.options.length = 1;
            disableButton("submit");
            states = [];
            states.push(info_prices);
        })
    
  
    
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
        //get info from API and append to drop down menu for block charts
        function processBlockInfo(block){
            info_blocks = block
            block_symbol = document.querySelector("#block-symbol");
            block_datatype = document.querySelector("#block-datatype");
            block_interval = document.querySelector("#block-interval");
            block_submit = document.querySelector("#block-submit");
            block_reset = document.querySelector("#block-reset");
            block_symbol_x = document.querySelector("#block-symbol-x"); 
            enableDropdown("block-symbol");
            block_symbol_x.onclick = function(event){
                document.getElementById("block-symbol-arrow").classList.remove("glyphicon", "glyphicon-arrow-right");
                enableDropdown("first");
                disableDropdown("block-symbol");
                resetDropdown("block-symbol");
                disableButton("block-submit");
                resetDropdown("first");
                createOptions([{first :"Price/Volume"},{first : "Block"}],"first");
                states = [];
            }
            disableDropdown("block-datatype")
            disableDropdown("block-interval")
            createBlockOptions(info_blocks,"block-symbol")
            disableButton("block-submit")

            var states = []
            states.push(info_blocks)

            function LoadBlockOptions(id,prev_id,next_id){
                 tag = document.querySelector("#" + id)
                tag.onchange = function(event){
                    current = states[states.length-1]
                    if(id == "block-symbol"){
                        current = current.filter(line => line.coin.includes(document.getElementById(id).value))
                    }else if(id == "block-datatype"){
                        current = current.filter(line => line.datatype.includes(document.getElementById(id).value))
                    }else{
                    }
                        if(id == "block-interval"){
                            enableButton("block-submit")
                            disableDropdown("block-interval")
                            block_submit_x = document.querySelector("#block-submit-x")
                            block_submit_x.onclick = function(event){
                                document.getElementById("block-submit-arrow").classList.remove("glyphicon", "glyphicon-arrow-right");
                                enableDropdown("block-interval")
                                disableButton("block-submit")
                            }
                        }else{
                            states.push(current)
                            enableDropdown(next_id)
                            createBlockOptions(states[states.length-1],next_id)
                            disableDropdown(id)
                             cancel = document.querySelector("#" + next_id + "-x")                
                            cancel.onclick = function(event){
                                enableDropdown(id)
                                disableDropdown(next_id)
                                resetDropdown(next_id)
                                states.pop()
                                resetDropdown(id)//delete all options of id
                                createBlockOptions(states[states.length-1],id)//create them again
                            }
                        }
                    }
                }

                LoadBlockOptions("block-symbol","none","block-datatype")
                LoadBlockOptions("block-datatype", "block-symbol", "block-interval")
                LoadBlockOptions("block-interval", "block-datatype", "none")

            block_reset.onclick  = function(event){
                info_blocks = block
                block_symbol.options.length = 1
                createBlockOptions(info_blocks,"block-symbol")
                enableDropdown("block-symbol")
                disableDropdown("block-datatype")
                block_datatype.options.length = 1
                disableDropdown("block-interval")
                block_interval.options.length = 1
                disableButton("block-submit")
                states = []
                states.push(info_blocks)
            } 
            
            block_submit.addEventListener("click", function(){
                info_blocks = block
                block_symbol.options.length = 1
                createBlockOptions(info_blocks,"block-symbol")
                enableDropdown("block-symbol")
                disableDropdown("block-datatype")
                block_datatype.options.length = 1
                disableDropdown("block-interval")
                block_interval.options.length = 1
                disableButton("block-submit")
                states = []
                states.push(info_blocks)
            })
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
            document.getElementById(select_label).style.color = "black"
        }

        function enableButton(select){
            let arrow_label = select + "-arrow"
            let x_label = select + "-x"
            let parent_div = select + "-parent"
            document.getElementById(select).disabled = false
            document.getElementById(arrow_label).classList.add("glyphicon", "glyphicon-arrow-right")
            document.getElementById(x_label).classList.add("glyphicon", "glyphicon-remove")
            document.getElementById(parent_div).style.display = "block"

        }

        function disableButton(select){
            let arrow_label = select + "-arrow"
            let x_label = select + "-x"
            let parent_div = select + "-parent"  
            document.getElementById(arrow_label).classList.remove("glyphicon", "glyphicon-arrow-right");
            document.getElementById(select).disabled = true
            document.getElementById(x_label).classList.remove("glyphicon", "glyphicon-remove");
            document.getElementById(parent_div).style.display = "none"  
        }



        //given info array of objects and string id populate the dropdowns with the info of type id. 
        function createOptions(info, id){
            var info_array = [];
            for(i = 0 ; i < info.length ; i++){
                if(id == "first"){text = info[i].first}
                if(id == "symbol"){text = info[i].symbol;}
                if(id == "unit"){text = info[i].unit;}
                if(id == "exchange"){text = info[i].exchange;}
                if(id == "interval"){text = info[i].interval;}
                if(!info_array.includes(text)){
                    info_array.push(text);
                }
            }
            info_array.sort();
            for(let i = 0 ; i < info_array.length ; i++){
                if(id == "exchange" && info_array[i] == "Aggregated"){
                    continue;
                }
                var option = document.createElement("option");
                if(id == "interval"){
                    option.text = convertIntervalNumberToText(info_array[i]);
                }else{
                    option.text = info_array[i];
                }
                var select = document.getElementById(id);
                select.appendChild(option); 
                select.appendChild(option); 
            }
            if(id == "exchange" && info_array.includes("Aggregated")){
                var option = document.createElement("option");
                option.text = "Aggregated";
                var select = document.getElementById(id);
                select.appendChild(option); 
            }
        }

        function createBlockOptions(info, id){
            var info_array = []
            for(i = 0 ; i < info.length ; i++){
                if(id == "block-symbol"){text = info[i].coin}
                if(id == "block-datatype"){text = info[i].datatype}
                if(id == "block-interval"){text = info[i].interval}
                if(!info_array.includes(text)){
                    info_array.push(text)
                }
            }
            info_array.sort()
            for(i = 0 ; i < info_array.length ; i++){
                var option = document.createElement("option")
                if(id == "block-interval"){
                    option.text = convertIntervalNumberToText(info_array[i]);
                }else{
                    option.text = info_array[i];
                }
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
                return "No Averaging"   
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

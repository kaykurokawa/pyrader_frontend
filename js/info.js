var Info = (function(){

    var MICRO = Math.pow(10,6)
    var MILLI = Math.pow(10,3)
    var HUNDREDMIL = Math.pow(10,8)
    var TENTHOUSAND = Math.pow(10,4)
    var conversions = {"USD": HUNDREDMIL, "BTC" : HUNDREDMIL, "DOGE" : HUNDREDMIL, 
    "LTC" : HUNDREDMIL, "ETH" : HUNDREDMIL, "EUR" : HUNDREDMIL, "SGD" : HUNDREDMIL, "KRW" : TENTHOUSAND}

        //Call Info API and pass information to dropdowns 
        function getInfo(){
            url= 'http://api.blkdat.com/info?'
             fetch(url)
             .then(
             function(response) {
                 if (response.status !== 200) {
                 console.log('Looks like there was a problem. Status Code: ' +
                     response.status);
                     return;
                     }
                     response.json().then(function(data) {
                         processInfo(data)
                         processBlockInfo(data)
                     });
                     }
                 )
                     .catch(function(err) {
                         console.log('Fetch Error :-S', err);
                     });
         }


    function processInfo(json){
        info = []
        info = json.price
        n = json.price.length
        var symbol = document.getElementById("symbol")
        var unit = document.getElementById("unit")
        var exchange = document.getElementById("exchange")
        var reporting_period = document.getElementById("reporting-period")
        var interval = document.getElementById("interval")
        var submit = document.getElementById("submit")
        var reset = document.getElementById("reset") 
        unit.disabled = true
        document.getElementById("unit-label").opactiy = 0.6
        exchange.disabled= true
        reporting_period.disabled = true
        interval.disabled = true
        submit.disabled = true
        createOptions(info,"symbol")

        symbol.onchange = function(event){
            info = info.filter(line => line.symbol.includes(document.getElementById("symbol").value))
            unit.disabled = false
            console.log(info)
            createOptions(info,"unit")
            symbol.disabled = true
        }

        unit.onchange = function(event){
            info = info.filter(line => line.unit.includes(document.getElementById("unit").value))
            exchange.disabled = false
             console.log(info)
            createOptions(info, "exchange")
            unit.disabled = true
        } 

        exchange.onchange = function(event){
            info.forEach(function(item){if(item.exchange == null){item.exchange = "none"}})
            info = info.filter(line => line.exchange.includes(document.getElementById("exchange").value))            
            console.log(info)
            interval.disabled = false
            createOptions(info, "interval")
            exchange.disabled = true
        }
        
        interval.onchange  = function(event){
            reporting_period.disabled = false
            submit.disabled = false
            interval.disabled = true
            info = json.price
            console.log(info)
        }     

        reset.onclick  = function(event){
            info = json.price
            unit.disabled = false
            unit.options.length = 1
            exchange.disabled = true
            exchange.options.length = 1
            reporting_period.disabled = true
            interval.disabled = true
            interval.options.length = 1
            submit.disabled = true;
            symbol.disabled = false;
            symbol.options.length = 1
            createOptions(info,"symbol")
        }    
    }

        //get info from API and append to drop down menu for block charts
        function processBlockInfo(json){
            var m = json.block.length
            var symbols_array = ["LTC"]
            var datatype_array = ["height"]
    
            for(i = 0; i < m ; i++){
                symbol_text = json.block[i].coin 
                datatype_text = json.block[i].datatype
                if (!symbols_array.includes(symbol_text)){
                    symbols_array.push(symbol_text)
                    var symbol_option = document.createElement("option")
                    symbol_option.text = symbol_text
                    var select = document.getElementById("block-symbol");
                    select.appendChild(symbol_option) 
                }
                    
                if (!datatype_array.includes(datatype_text)){
                    datatype_array.push(datatype_text)
                    var datatype_option = document.createElement("option")
                    datatype_option.text = datatype_text
                    var select = document.getElementById("block-datatype");
                    select.appendChild(datatype_option)
                }
    
            }
            
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
        }
        
        function convertIntervalNumberToText(interval){
            if(interval/MICRO == 86400)
                return "day"
            if(interval/MICRO == 3600)
                return "hour"
            if(interval/MICRO == 300)
                return "5min"
    
        }


    return {
        getInfo: getInfo
    } 

}());
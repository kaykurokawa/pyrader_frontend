var Input = (function(){

    function getAPI(){
        var exchange = document.getElementById("exchange").value 
        var symbol = document.getElementById("symbol").value
        var unit = document.getElementById("unit").value
        var interval = document.getElementById("interval").value
        if(interval == "5 min."){
            interval = "5min"
            interval_i = 300000000
        }else if(interval == "1 hour"){
            interval = "hour"
            interval_i = 3600000000
        }else if(interval == "1 day"){
            interval = "day"
            interval_i = 86400000000
        }else{
            interval = ""
        }

        var parameter = 'http://api.blkdat.com/price?' + 'symbol=' + symbol 
        + '&exchange=' + exchange + '&unit=' + unit + '&interval=' + interval      
        window.parameter = parameter
        console.log(parameter)
    fetch(parameter)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
            return;
            }
            response.json().then(function(data) {
                data = processDates(data,interval_i)
                console.log(data)
                data = processPrices(data,unit)
                window.apiCall = data
                //Here you will pass data to whatever Graphing library asynchronosly
                Graph.drawPriceGraph(data)
                Graph.drawVolumeGraph(data)
            });
            }
        )
            .catch(function(err) {
            console.log('Fetch Error :-S', err);
            });
    }

    function processDates(json,interval_i){
        var timeArray = []
        var time = json.data[0]
        for(i = 0 ; i < json.data[2].length ; i++){
            timeArray.push(time)
            time += interval_i
        }
        timeArray = convertUnix(timeArray)
        json.data.push(timeArray)
        return json
    }

    function processPrices(json,unit){
        if(unit == "USD"){
            json.data[2] = json.data[2].map(function(cents){return Number(Math.round(cents/100000000 + 'e2') + 'e-2')})
        }else if(unit == "BTC"){
            //What would this be?
            json.data[2] = json.data[2].map(function(cents){return Number(Math.round(cents/100000000 + 'e2') + 'e-2')})
        }else{
            //What would this be?
            json.data[2] = json.data[2].map(function(cents){return Number(Math.round(cents/100000000 + 'e2') + 'e-2')})
        }
        return json
        }

    function processVolume(json,unit){
            if(unit == "USD"){
                json.data[3] = json.data[3].map(function(vol){return Number(Math.round(vol/100000000 + 'e2') + 'e-2')})
            }else if(unit == "BTC"){
                //What would this be?
                json.data[3] = json.data[3].map(function(cents){return Number(Math.round(vol/100000000 + 'e2') + 'e-2')})
            }else{
                //What would this be?
                json.data[3] = json.data[3].map(function(cents){return Number(Math.round(vol/100000000 + 'e2') + 'e-2')})
            }
            return json
            }      

    function convertUnix(data){
          function unixToReg(time){
            return new Date(time/1000)
          }
          return data.map(function(time){return unixToReg(time)})
    }

    function getData(){
        return window.apiCall
    }

    function getParameter(){
        return window.parameter
    }
 
    return {
        getAPI: getAPI,
        getData: getData,
        getParameter: getParameter
    } 

}());

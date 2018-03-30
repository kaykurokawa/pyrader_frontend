var Info = require('/js/info.js')
var Input = require('/js/input.js')
var Url = require('/js/url.js')
var High = require('/js/hgraph.js')
var Model = require('/js/dataModel.js')

$(document).ready(function () {
    Info.getInfo()
    url = Url.getURL()
    //this call changes the datamodel
    Input.getPriceAPI(Input.initialPriceParameter(url)).then(
        function(json){
            interval_i = json.interval/1000
            var x = Input.processDates(json,interval_i)
            var y_prices = Input.processPrices(json,unit)
            var y_volume = Input.processVolume(json,unit)
            var coin_data = json.symbol
            var unit_data = json.unit
            var last_price = y_prices[y_prices.length-1]
            var last_volume = y_volume[y_volume.length-1]
            var first_date = x[0]
            var last_date = x[x.length-1]
            High.removeErrors()
            High.drawPriceVolumeGraph(coin_data,unit_data,x,y_prices,y_volume)
            High.drawPriceHeader(coin_data,unit_data,last_price,last_volume,first_date, last_date)
        }).catch(function (error) {
            console.error("could not fetch data");
          });
        



     //this call changes the datamodel. 
    Input.getBlockAPI(Input.initialBlockParameter(url))
     //now take the datamodel and draw the graph 
   
  });
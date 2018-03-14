

//Create Highcharts for price/volume
function drawPriceVolumeGraph(json){
console.log(json)
Highcharts.setOptions({global:{useUTC: false}});
coin = json.symbol
unit = json.unit
current_price = json.data[2][json.data[2].length-1]
current_volume = json.data[3][json.data[3].length-1]
from_date = new Date(json.data[4][0]).toDateString() + " " + new Date(json.data[4][0]).toLocaleTimeString('en-US')
to_date = new Date(json.data[4][json.data[4].length-1]).toDateString() + " " + new Date(json.data[4][json.data[4].length-1]).toLocaleTimeString('en-US')
volume = []
prices = []
json.data[2].length
 // set the allowed units for data grouping
 groupingUnits = [[
     'week',                         // unit name
     [1]                             // allowed multiples
 ], [
     'month',
     [1, 2, 3, 4, 6]
 ]]

for(i = 0 ; i < json.data[2].length ; i++){
    prices.push([json.data[4][i], json.data[2][i]])
    volume.push([json.data[4][i], json.data[3][i]])
}

document.getElementById("time-period").innerHTML =  from_date + " to " + to_date 
document.getElementById("current-price").innerHTML =  coin + ": " + current_price + " " + unit
document.getElementById("current-volume").innerHTML = coin + ": " + current_volume + " " + unit
minimum = Math.min.apply(null, json.data[2])
title = json.symbol + " Charts"
y_axis1 = "Price of " + json.symbol + " in " + json.unit
y_axis2 = "Volume of " + json.symbol + " in " + json.unit

// create the chart
hchart = Highcharts.stockChart('hchart', {

 rangeSelector: {
     selected: 1
 },

 yAxis: [{
     labels: {
         align: 'right',
         x: -3
     },
     title: {
         text:  y_axis1
     },
     height: '60%',
     lineWidth: 2,
     //floor: minimum,
     type: 'logarithmic',
     minorTickInterval: 0.1,
     resize: {
         enabled: true
     }
 }, {
     labels: {
         align: 'right',
         x: -3
     },
     title: {
         text: y_axis2
     },
     top: '65%',
     height: '35%',
     offset: 0,
     lineWidth: 2
 }],

 tooltip: {
     split: true,
     //valueDecimals: 2
 },

 series: [{
     type: 'area',
     name: 'Cryptocurrency',
     data: prices,
     dataGrouping: {
         enabled: false,
         units: groupingUnits
     }
 }, {
     type: 'column',
     name: 'Volume',
     data: volume,
     yAxis: 1,
     dataGrouping: {
         enabled: false,
         units: groupingUnits
     }
 }]
});

 }
//Create Highcharts for block
 function drawBlockGraph(json){
    data = []
    for(i = 0 ; i < json.data[2].length ; i++){
        data.push([json.data[3][i], json.data[2][i]])
    }
    minimum = Math.min.apply(null, json.data[2])
    coin = json.coin
    datatype =json.datatype
    console.log(json)
    title = json.coin + " " + json.datatype + " " + "chart"
    y_axis = json.datatype + " of " + json.coin
    from_date = new Date(json.data[3][0]).toDateString() + " " + new Date(json.data[3][0]).toLocaleTimeString('en-US')
    to_date = new Date(json.data[3][json.data[3].length-1]).toDateString() + " " +  new Date(json.data[3][json.data[3].length-1]).toLocaleTimeString('en-US')
    current_block = json.data[2][json.data[2].length-1]
    document.getElementById("block-time-period").innerHTML =  from_date  + " to " + to_date
    document.getElementById("current-block").innerHTML = datatype + " for " + coin + " " + current_block

       // create the chart
    Highcharts.stockChart('block-hchart', {
                rangeSelector: {
                    selected: 1
                },
        
                title: {
                    text: title
                },
        
                series: [{
                    name: y_axis,
                    data: data,
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            });
 }

//clear Highcharts and all the HTML associated with it
 function clearCharts(){
    document.getElementById("error").innerHTML = "No data for this exchange/interval" 
    document.getElementById("error").className = "well"
    document.getElementById("time").style.display = "none"
    document.getElementById("current-price").style.display = "none"
    document.getElementById("current-volume").style.display = "none"
    $('#hchart').highcharts().destroy();
 }

//generate the Highcharts
 function showCharts(){
    document.getElementById("error").innerHTML = "" 
    document.getElementById("error").classList.remove("well");
    document.getElementById("time-period").style.display = "block"
    document.getElementById("current-price").style.display = "block"
    document.getElementById("current-volume").style.display = "block"
 }

 function clearBlockCharts(){
    document.getElementById("block-error").innerHTML = "No data for this datatype/interval" 
    document.getElementById("block-error").className = "well"
    document.getElementById("block-time").style.display = "none"
    document.getElementById("current-block").style.display = "none"
    $('#block-hchart').highcharts().destroy();
 }

//generate the Highcharts
 function showBlockCharts(){
    document.getElementById("block-error").innerHTML = "" 
    document.getElementById("block-error").classList.remove("well");
    document.getElementById("block-time").style.display = "block"
    document.getElementById("current-block").style.display = "block"
 }

module.exports = {
    drawPriceVolumeGraph : drawPriceVolumeGraph,
    showCharts : showCharts,
    clearCharts : clearCharts,
    drawBlockGraph : drawBlockGraph,
    showBlockCharts : showBlockCharts,
    clearBlockCharts : clearBlockCharts,
  }
  

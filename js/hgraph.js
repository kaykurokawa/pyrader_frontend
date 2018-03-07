 // split the data set into ohlc and volume
 var High = (function(){

function drawPriceVolumeGraph(json){

Highcharts.setOptions(Highcharts.theme);
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
    prices.push([json.data[5][i], json.data[2][i]])
    volume.push([json.data[5][i], json.data[3][i]])
}
minimum = Math.min.apply(null, json.data[2])
title = json.symbol + " Charts"
y_axis1 = "Price of " + json.symbol + " in " + json.unit
y_axis2 = "Volume of " + json.symbol + " in " + json.unit

// create the chart
hchart = Highcharts.stockChart('hchart', {

 rangeSelector: {
     selected: 1
 },

 title: {
     text: title
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
     floor: minimum,
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
     split: true
 },

 series: [{
     type: 'area',
     name: 'Bitcoin',
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

 function drawBlockGraph(json){
    data = []
    for(i = 0 ; i < json.data[2].length ; i++){
        data.push([json.data[4][i], json.data[2][i]])
    }
    minimum = Math.min.apply(null, json.data[2])
    coin = json.coin
    datatype =json.datatype
    date = json.data[3][json.data[3].length-1]
    title = json.coin + " " + json.datatype + " " + "chart"
    y_axis = json.datatype + " of " + json.coin

    document.getElementById("h-current-block").innerHTML = "Current " + datatype + " of " + coin + ": " + data[data.length-1][1].toLocaleString()
    document.getElementById("h-block-time").innerHTML = "As of " + date 

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


 function clearCharts(){
    document.getElementById("error").innerHTML = "No data for this exchange" 
    document.getElementById("error").className = "well"
    document.getElementById("chart1").style.display = "none"
    document.getElementById("chart2").style.display = "none"
    document.getElementById("time").style.display = "none"
    document.getElementById("current-price").style.display = "none"
    document.getElementById("current-volume").style.display = "none"
    $('#hchart').highcharts().destroy();
 }

 function showCharts(){
    document.getElementById("error").innerHTML = "" 
    document.getElementById("error").classList.remove("well");
    document.getElementById("chart1").style.display = "block"
    document.getElementById("chart2").style.display = "block"
    document.getElementById("time").style.display = "block"
    document.getElementById("current-price").style.display = "block"
    document.getElementById("current-volume").style.display = "block"
 }

return {
    drawPriceVolumeGraph : drawPriceVolumeGraph,
    showCharts : showCharts,
    clearCharts : clearCharts,
    drawBlockGraph : drawBlockGraph
  }
  
  }());
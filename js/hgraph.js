

//Create Highcharts for price/volume
function drawPriceVolumeGraph(json){
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
    block_data = []
    for(i = 0 ; i < json.data[2].length ; i++){
        block_data.push([json.data[3][i], json.data[2][i]])
    }
    minimum = Math.min.apply(null, json.data[2])
    coin = json.coin
    datatype = json.datatype
    title = json.coin + " " + json.datatype + " " + "chart"
    y_axis = json.datatype + " of " + json.coin
    from_date = new Date(json.data[3][0]).toDateString() + " " + new Date(json.data[3][0]).toLocaleTimeString('en-US')
    to_date = new Date(json.data[3][json.data[3].length-1]).toDateString() + " " +  new Date(json.data[3][json.data[3].length-1]).toLocaleTimeString('en-US')
    current_block = json.data[2][json.data[2].length-1]
    document.getElementById("block-time-period").innerHTML =  from_date  + " to " + to_date
    document.getElementById("current-block").innerHTML = datatype + " for " + coin + " " + current_block
    document.getElementById("current-block-label").innerHTML = "current "+ datatype + ": "

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
                    data: block_data,
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            });
 }



 function drawScatterPlot(json){
    block_data = []
    for(i = 0 ; i < json.data[2].length ; i++){
        block_data.push([json.data[3][i], json.data[2][i]])
    }
    title = json.coin + " " + json.datatype + " " + "chart"
    y_axis = json.datatype + " of " + json.coin
    Highcharts.stockChart('block-hchart-scatter', {
                rangeSelector: {
                    selected: 2
                },
        
                title: {
                    text: title
                },
        
                series: [{
                    name: y_axis,
                    data: block_data,
                    lineWidth: 0,
                    marker: {
                        enabled: true,
                        radius: 5
                    },
                    tooltip: {
                        valueDecimals: 2
                    },
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                }]
            });
 }

//clear Highcharts and all the HTML associated with it

 function clearCharts(){
    document.getElementById("error").innerHTML = "No data for this period" 
    document.getElementById("error").className = "well"
    $("#table-of-prices tr").remove(); 
    $('#hchart').highcharts().destroy();

 }

//generate the Highcharts
 function showCharts(){
    document.getElementById("error").innerHTML = "" 
    document.getElementById("error").classList.remove("well");
 }

 function clearBlockCharts(){
    document.getElementById("block-error").innerHTML = "No data for this this period" 
    document.getElementById("block-error").className = "well"
    $("#table-of-blocks tr").remove(); 
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
    drawScatterPlot : drawScatterPlot,
  }
  

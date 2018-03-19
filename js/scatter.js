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
                    type: 'scatter',
                    name: y_axis,
                    data: block_data,
                    marker: {
                        enabled: true,
                        radius: 5
                    },
                    tooltip: {
                        valueDecimals: 2
                    },
                }]
            });
 }

 function doit(now){
     return now
 }
module.exports = {
    drawScatterPlot: drawScatterPlot,
    doit: doit

}
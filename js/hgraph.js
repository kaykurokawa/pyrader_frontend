
//Create Highcharts for price/volume
function addPriceVolumeGraph(id1,id2,coin,unit,x,y_prices,y_volume){
    volume = [];
    prices = [];
    for(i = 0 ; i < x.length ; i++){
        prices.push([x[i], y_prices[i]]);
        volume.push([x[i], y_volume[i]]);
    }
    minimum = Math.min.apply(null, y_prices);
    title = coin + " Charts";
    y_axis1 = "Price of " + coin + " in " + unit;
    y_axis2 = "Volume of " + coin + " in " + unit;

    //price axis
    hchart.addAxis({   
            id: id1.toString() + "-axis",
            colorIndex: id1,
            className: 'highcharts-color-' + id1,
            labels: {
                align: 'left',
            },
            title: {
                text:  '<div class="highcharts-color-' + id1 + '">' + y_axis1 + '</div>'
            },
            height: '65%',
            lineWidth: 2,
            type: 'linear',
            opposite: true,
         }
    );
    //price series
    hchart.addSeries({
        //boostThreshold: 1, 0 for off 1 for force
        id: id1.toString(),
        colorIndex: id1,
        type: 'line',
        name: y_axis1,
        unit: unit,
        data: prices,
        yAxis: hchart.yAxis.length-1,
        dataGrouping: {
            enabled: false,
            units: groupingUnits
        }
    });

    //volume axis  
    hchart.addAxis({
            id: id2.toString() + "-axis",
            colorIndex: id2,
            className: 'highcharts-color-' + id2,
            labels: {
                align: 'left',
                x: -40
            },
            title: {
                text: '<div class="highcharts-color-' + id2 + '">' + y_axis2 + '</div>'
            },
            top: '70%',
            height: '30%',
            type: 'column',
            lineWidth: 2,
            opposite: true,
        });

    //volume series
    hchart.addSeries({
        id: id2.toString(),
        colorIndex: id2,
        //boostThreshold: 1, 0 for off 1 for force
        type: 'column',
        name: y_axis2,
        unit: unit,
        data: volume,
        yAxis: hchart.yAxis.length-1,
        dataGrouping: {
            enabled: false,
            units: groupingUnits
        }
    });
}

//Create Highcharts for block
 function addBlockGraph(id,coin,datatype,x,y){
    block_data = [];
    for(i = 0 ; i < x.length ; i++){
        block_data.push([x[i], y[i]]);
    }

    title = coin + " " + datatype + " " + "chart";
    y_axis = datatype + " of " + coin;
    //add block axis
    hchart.addAxis({   
             id: id.toString() + "-axis",
             className: 'highcharts-color-' + id,
             colorIndex: id,
             labels: {
                 align: 'left',
             },
             title: {
                 text:  '<div class="highcharts-color-' + id + '">' + y_axis + '</div>'
             },
             height: '70%',
             lineWidth: 2,
             type: 'linear',
             minorTickInterval: 0.1,
             opposite: true,
          })

    //add block series
    hchart.addSeries({
        id: id.toString(),
        colorIndex: id,
        //boostThreshold: 1, 0 for off 1 for force
        type: 'line',
        name: y_axis,
        data: block_data,
        yAxis: hchart.yAxis.length-1,
        dataGrouping: {
            enabled: false,
            units: groupingUnits
        }
    })
}

function addScatterPlot(id,coin,datatype,x,y){
    block_data = []
    for(i = 0 ; i < x.length ; i++){
        block_data.push([x[i], y[i]])
    }
    title = coin + " " + datatype + " " + "chart"
    y_axis = datatype + " of " + coin
    hchart.addAxis(
        
         {   
             id: id.toString() + "-axis",
             className: 'highcharts-color-' + id,
             colorIndex: id,
             labels: {
                 align: 'left',
             },
             title: {
                 text:  '<div class="highcharts-color-' + id + '">' + y_axis + '</div>'
             },
             height: '70%',
             lineWidth: 2,
             type: 'scatter',
             minorTickInterval: 0.1,
             opposite: true,
          }
     )

    hchart.addSeries({
        id : id.toString(),
        colorIndex: id,
        //boostThreshold: 1, 0 for off 1 for force
        type: 'scatter',
        name: y_axis,
        data: block_data,
        yAxis: hchart.yAxis.length-1,
        dataGrouping: {
            enabled: false,
            units: groupingUnits
        },
        marker: {
            enabled: true,
            radius: 5
        },
    })
}

groupingUnits = [['week',[1]], ['month',[1, 2, 3, 4, 6]]]

hchart = Highcharts.stockChart('hchart', {
    
    rangeSelector: {
        allButtonsEnabled: true,
        buttons: [{
            type: 'day',
            count: 1,
            text: 'Day',
        }, {
            type: 'week',
            count: 1,
            text: 'Week',
        }, {
            type: 'month',
            count: 1,
            text: 'Month',
        },{
            type: 'all',
            text: 'All',
        }],
        buttonTheme: {
            width: 60
        },
        selected: 1
    },

        boost: {
            enabled: true,
            useGPUTranslations:true
        },
        plotOptions: {
            series: {
                turboThreshold: 2000
            }
        },
        yAxis: [],
        xAxis: {
            labels: {
                style: {
                    width: '100px',
                    'min-width': '100px'
                },
                useHTML : true
            }
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: '#000000',
                fontWeight: 'bold'
            }
        },
        plotOptions: {
            series: {stickyTracking: false}
        },
        tooltip: {
             formatter: function () {
                 //format the tool tip if it is less than 1 then it is 7 digits and if not then it is 2.
                 var dec1;
                 var dec2;
                 //format the tool tip for price and volume 
                 if(this.hasOwnProperty('points') && this.points.length == 2){
                    this.points[0].y < 1 ? dec1 = 8 : dec1 = 2;
                    this.points[1].y < 1 ? dec2 = 8 : dec2 = 2;
                    styl1 = this.points[0].colorIndex;
                    styl2 = this.points[1].colorIndex;
                    return '<span class="highcharts-color-' + styl1 + '">▣ </span>' + this.points[0].series.name + ' ' + Highcharts.dateFormat('%B %e, %H:%M', this.points[0].x) + ': <b>' + Highcharts.numberFormat(this.points[0].y, dec1) + " " +'</b>'
                    +  '<br/>' +'<span class="highcharts-color-' + styl2 + '">▣ </span>'  +this.points[1].series.name +  ' ' + Highcharts.dateFormat('%B %e, %H:%M', this.points[1].x) + ': <b>' + Highcharts.numberFormat(this.points[1].y, dec2) + " " +'</b>';
                //format the tool tip if it is just one of price or volume 
                }else if(this.hasOwnProperty('points') && this.points.length == 1){
                    this.points[0].y < 1 ? dec1 = 8 : dec1 = 2;
                    styl = this.points[0].colorIndex;
                    return '<span class="highcharts-color-' + styl + '">▣ </span>' + this.points[0].series.name + ' ' + Highcharts.dateFormat('%B %e, %H:%M', this.x) + ': <b>' + Highcharts.numberFormat(this.y, dec1) + '</b>';
                //format the tooltip if it is scatter 
                }else{
                    this.y < 1 ? dec1 = 8 : dec1 = 2;    
                    styl = this.colorIndex;
                    return '<span class="highcharts-color-' + styl + '">▣ </span>' + this.series.name + ' ' + Highcharts.dateFormat('%B %e, %H:%M', this.x) + ': <b>' +  Highcharts.numberFormat(this.y, dec1) + '</b>';
                }
             },
             shared: true,
        },
    
        series: []
        });

//generate the Highcharts

module.exports = {
    addBlockGraph : addBlockGraph,
    addScatterPlot : addScatterPlot,
    addPriceVolumeGraph : addPriceVolumeGraph
  }
  

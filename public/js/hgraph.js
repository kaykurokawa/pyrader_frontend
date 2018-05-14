const URL = require('./url.js');

//Create Highcharts for price/volume
function addPriceVolumeGraph(id1,id2,coin,unit,x,y_prices,y_volume,start,end){
    volume = [];
    prices = [];
  
    for(i = 0 ; i < x.length ; i++){
        if(x[i] >= start && x[i] <= end){
            prices.push([x[i], y_prices[i]]);
            volume.push([x[i], y_volume[i]]);
        }
    }

    prices.sort();
    volume.sort();
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
            opposite: true,
         }
    );

    //price series
    hchart.addSeries({
        id: id1.toString(),
        colorIndex: id1,
        type: 'line',
        name: y_axis1,
        unit: unit,
        data: prices,
        yAxis: hchart.yAxis.length-1,
        //yAxis: id1.toString() + "-axis",
        //boostThreshold: 1
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
        type: 'column',
        name: y_axis2,
        unit: unit,
        data: volume,
        yAxis: hchart.yAxis.length-1,
        //yAxis: id2.toString() + "-axis",
        //boostThreshold: 1
    });

    //if the min and max of this price you are going to add is similar to the previous one the
    //on the first refresh it does i right
    NormalizeAxis(id1, "Price")
    NormalizeAxis(id2, "Volume")

}

function NormalizeAxis(id, matcher){
    let hchart = $('#hchart').highcharts();
    var current= hchart.get(id.toString() + "-axis")
    console.log(hchart.yAxis)
    if(id > 1){ 
        for(let i = 1 ; i < hchart.yAxis.length ; i++){
            iterating_axis = hchart.get(i.toString() + "-axis")
            if(iterating_axis == current){
                continue;
            }
    
            if(nearTwentyPercent(iterating_axis.dataMax, current.dataMax) && nearTwentyPercent(iterating_axis.dataMin, current.dataMin) && iterating_axis.userOptions.title.text.includes(matcher)){
            console.log("merging!")        
            //add property LinkTo to the your axis. 
            current.update({linkedTo : i})
            }
        }    
    }
}

function nearTwentyPercent(compare_minmax, current_minmax){
    if(Math.abs(compare_minmax - current_minmax)/current_minmax < 0.2){
        return true;
    }else{
        return false;
    }  
}


//Create Highcharts for block
 function addBlockGraph(id,coin,datatype,x,y,start,end){
    block_data = [];
    for(i = 0 ; i < x.length ; i++){
        if(x[i] >= start && x[i] <= end){
            block_data.push([x[i], y[i]]);
        }
    }
    block_data.sort();
    title = coin + " " + datatype + " " + "chart";
    y_axis = datatype + " of " + coin + " Block";
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
             height: '65%',
             lineWidth: 2,
             minorTickInterval: 0.1,
             opposite: true,
            
          })

    //add block series
    hchart.addSeries({
        id: id.toString(),
        colorIndex: id,
        //boostThreshold: 1,
        type: 'line',
        name: y_axis,
        data: block_data,
        yAxis: id.toString() + "-axis",
    })

    NormalizeAxis(id, "Block")
}

function addScatterPlot(id,coin,datatype,x,y,start,end){
    block_data = []
    for(i = 0 ; i < x.length ; i++){
        if(x[i] >= start && x[i] <= end){
            block_data.push([x[i], y[i]])
        }

    }
    block_data.sort();
    title = coin + " " + datatype + " " + "chart"
    y_axis = datatype + " of " + coin + " Block"
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
             height: '65%',
             lineWidth: 2,
             minorTickInterval: 0.1,
             opposite: true,
          }
     )

    hchart.addSeries({
        id : id.toString(),
        colorIndex: id,
        //boostThreshold: 1,
        type: 'scatter',
        name: y_axis,
        data: block_data,
        yAxis: id.toString()+ "-axis",
        marker: {
            enabled: true,
            radius: 5
        },
    })

    NormalizeAxis(id, "Block")
}


//Allows you to pick the default range given a query parameter
let url = URL.getURL()
let range = URL.getParameterByName("range", url) 
let selector = 1;
if(range != null){
    if(range == "day"){
        selector = 0
    }else if(range == "week"){
        selector = 1
    }else if(range == "month"){
        selector = 2
    }else if(range == "all"){
        selector = 3
    }
}



//generate the Highcharts
var hchart = Highcharts.stockChart('hchart', {
    
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
        selected: selector
    },

        /*boost: {
            seriesThreshold: 1,
            enabled: true,
            useGPUTranslations: true,
            useAlpha: false,
            usePreallocated: true
        },*/

        navigator: {
            adaptToUpdatedData: true,
        },

        scrollbar: {
            liveRedraw: true
        },
        plotOptions: {
            area: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } } },
            bar: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } } },
            column: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } } },
            line: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } } },
            scatter: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } } },
            series: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } } },
            spline: { animation: false, enableMouseTracking: false, stickyTracking: false, shadow: false, dataLabels: { style: { textShadow: false } } },
        },
        chart: {
            reflow: false,
            events: {
                redraw: function() {
                    console.log("highcharts redraw, rendering-done");
                    $('body').addClass('rendering-done');
                }
            },
            animation: false
        },
        exporting: {
            enabled:false
        },
        credits: {
            enabled: false
        },

        yAxis: [],
        xAxis: {
            labels: {
                style: {
                    width: '100px',
                    'min-width': '100px'
                },
                useHTML : true
            },
            events: {
                afterSetExtremes: function(event){
                    console.log("work")
                    document.querySelector('#share-link').onclick = function(e){
                        console.log("work")
                        let min_window = event.min*1000
                        let max_window = event.max*1000
                        URL.setShareLink(URL.getURL() + "&start=" + min_window + "&end=" + max_window) 
                    }    
                }
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
            enabled: true,
            animation: false,
             formatter: function () {
                 //format the tool tip if it is less than 1 then it is 7 digits and if not then it is 2.
                 var dec1;
                 var dec2;
                 //format the tool tip for price and volume 
                 if(this.hasOwnProperty('points') && this.points.length >= 2){
                    let string_return = "";
                    for(let i = 0 ; i < this.points.length ; i++){
                        string_return += '<span class="highcharts-color-' + this.points[i].colorIndex +'">▣ </span>' + this.points[i].series.name + ' ' + Highcharts.dateFormat('%B %e, %H:%M', this.points[i].x) + ': <b>' + Highcharts.numberFormat(this.points[i].y, (this.points[i].y < 1 ? dec1 = 8 : dec1 = 2)) + " " +'</b>' +  '<br/>' 
                    }
                    return string_return
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
             shared: false,
        },
    
        series: []
        });
  

module.exports = {
    addBlockGraph : addBlockGraph,
    addScatterPlot : addScatterPlot,
    addPriceVolumeGraph : addPriceVolumeGraph
  }
  

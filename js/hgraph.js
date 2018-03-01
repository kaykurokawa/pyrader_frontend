 // split the data set into ohlc and volume
 data = mydata
 var ohlc = [],
 volume = [],
 dataLength = data.length,
 // set the allowed units for data grouping
 groupingUnits = [[
     'week',                         // unit name
     [1]                             // allowed multiples
 ], [
     'month',
     [1, 2, 3, 4, 6]
 ]],

 i = 0;

for (i; i < dataLength; i += 1) {
 ohlc.push([
     data[i][0], // the date
     data[i][1], // open
 ]);

 volume.push([
     data[i][0], // the date
     data[i][5] // the volume
 ]);
}


// create the chart
Highcharts.stockChart('hchart', {

 rangeSelector: {
     selected: 1
 },

 title: {
     text: 'Coins'
 },

 yAxis: [{
     labels: {
         align: 'right',
         x: -3
     },
     title: {
         text: 'OHLC'
     },
     height: '60%',
     lineWidth: 2,
     resize: {
         enabled: true
     }
 }, {
     labels: {
         align: 'right',
         x: -3
     },
     title: {
         text: 'Volume'
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
     name: 'Bitcoin',
     data: ohlc,
     dataGrouping: {
         units: groupingUnits
     }
 }, {
     type: 'column',
     name: 'Volume',
     data: volume,
     yAxis: 1,
     dataGrouping: {
         units: groupingUnits
     }
 }]
});

   
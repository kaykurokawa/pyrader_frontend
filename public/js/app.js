const Input = require('/js/input.js');
const Url = require('/js/url.js');
const View = require('/js/url-models.js');

//test url: http://127.0.0.1:8080/?price&symbol=BTC&unit=USD&exchange=bitstamp&interval=hour/?price&symbol=BTC&unit=EUR&interval=day
//test url: http://localhost:8080/?block&coin=LTC&datatype=difficulty&interval=hour/?block&coin=LTC&datatype=difficulty&interval=0
//test url: http://127.0.0.1:8080/?price&symbol=BTC&unit=USD&interval=hour/?price&symbol=ETH&unit=USD&interval=hour

//Time stamps
//Test url" http://localhost:44389/?price&symbol=BTC&unit=USD&exchange=coinbase&interval=hour&start=1524683769000000&end=1524770169000000
//http://159.65.167.149:8888/price?symbol=BTC&unit=USD&interval=hour&exchange=coinbase&start=1524683769000000&end=1524770169000000
//http://159.65.167.149:8888/price?symbol=LTC&unit=USD&interval=hour&start=1525031120000000&end=1525117520000000
//http://localhost:44389/?price&symbol=LTC&unit=USD&interval=hour&start=1525031120000000&end=1525117520000000


$(document).ready(function () {

    /*set the "share link" button initial state"*/
    Url.setShareLink(Url.getURL())

    /*populate the graph via browser url if it has string query*/
    var url = Url.getURL();
    if(Url.isBlockUrl(url) || Url.isPriceUrl(url)){

    /*Model is a global representation of the url parameters input*/
        Input.convertToModel(url);
    }

    if(View.MODELS.length > 0){

        /*collect all queryies from url string into one model and get the corresponding data*/ 
        let parameters = [];
        for(let i = 0 ; i < View.MODELS.length ; i++){
                    parameters.push(Input.convertModelToParameter(View.MODELS[i])); 
            }
        Input.getAllAPI(parameters);
    }
 
    /* Or populate the graph by dropdowns/submit button*/
    document.getElementById("block-submit").onclick = function(event){
        Input.getBlockAPI(Input.readBlockValues());
    }

    document.getElementById("submit").onclick = function(event){
        Input.getPriceAPI(Input.readPricesValues());
    }

    });
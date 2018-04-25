const Info = require('/js/info.js');
const Input = require('/js/input.js');
const Url = require('/js/url.js');
const View = require('/js/url-models.js');

//test url: http://127.0.0.1:8080/?price&symbol=BTC&unit=USD&exchange=bitstamp&interval=hour/?price&symbol=BTC&unit=EUR&interval=day
//test url: http://localhost:8080/?block&coin=LTC&datatype=difficulty&interval=hour/?block&coin=LTC&datatype=difficulty&interval=0
//test url: http://127.0.0.1:8080/?price&symbol=BTC&unit=USD&interval=hour/?price&symbol=ETH&unit=USD&interval=hour

$(document).ready(function () {
    Info.getInfo();
  
    /*populate the graph via browser url if it has string query*/
    var url = Url.getURL();
    if(Url.isBlockUrl(url) || Url.isPriceUrl(url)){
        /*Model is a global representation of the url parameters input*/
        Input.convertToModel(url);
    }
    /*populate initial graph from Models*/
    if(View.MODELS.length > 0){
        for(let i = 0 ; i < View.MODELS.length ; i++){
            /*take a model and convert it to a usable parameter by getAPI*/

                if(View.MODELS[i].type == "price"){
                    parameters = Input.convertModelToParameter(View.MODELS[i]);
                    Input.getPriceAPI(parameters);
                }

                if(View.MODELS[i].type == "block"){
                    parameters = Input.convertModelToParameter(View.MODELS[i]);
                    Input.getBlockAPI(parameters);
                }
            } 
    }
    
    /* Or populate the graph by dropdowns/submit button*/
    document.getElementById("submit").onclick = function(event){
        Input.getPriceAPI(Input.readPricesValues());
    }
        document.getElementById("block-submit").onclick = function(event){
            Input.getBlockAPI(Input.readBlockValues());
        }
    });
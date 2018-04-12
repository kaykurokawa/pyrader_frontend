const Info = require('/js/info.js')
const Input = require('/js/input.js')
const Url = require('/js/url.js')
const view = require('/js/url-models.js')
//test url: http://127.0.0.1:8080/?price&symbol=BTC&unit=USD&exchange=bitstamp&interval=hour/?price&symbol=BTC&unit=EUR&interval=day
//test url: http://localhost:8080/?block&coin=LTC&datatype=difficulty&interval=hour/?block&coin=LTC&datatype=difficulty&interval=0
//test url: http://127.0.0.1:8080/?price&symbol=BTC&unit=USD&interval=hour/?price&symbol=ETH&unit=USD&interval=hour
$(document).ready(function () {
    Info.getInfo() /*initialize buttons*/
    url = Url.getURL() /*grab the url from browser*/
    if(Url.isBlockUrl(url) || Url.isPriceUrl(url)){
        /*convert that to global object, need global object so we can keep track of what query strings used.
        can convert multiple url stirngs into model*/
        Input.convertToModel(url)
    }
    /*populate initial graph from Models*/
    if(view.MODELS.length > 0){
        for(let i = 0 ; i < view.MODELS.length ; i++){
            /*take a model and convert it to a usable parameter by getAPI*/

                if(view.MODELS[i].type == "price"){
                    parameters = Input.convertModelToParameter(view.MODELS[i])
                    Input.getPriceAPI(parameters)
                }

                if(view.MODELS[i].type == "block"){
                    parameters = Input.convertModelToParameter(view.MODELS[i])
                    Input.getBlockAPI(parameters)
                }
            } 
    }
    /* Or populate the graph by dropdowns/submitting*/
    document.getElementById("submit").onclick = function(event){
        event.preventDefault();
        Input.getPriceAPI(Input.readPricesValues())
    }
        document.getElementById("block-submit").onclick = function(event){
            event.preventDefault();
            Input.getBlockAPI(Input.readBlockValues())
        }
    });
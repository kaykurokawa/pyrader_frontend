const View = require('./url-models.js');


function createBrowserUrl(models){
    url = ""
    for(let i = 0 ; i < models.length ; i++){
        if(models[i].type == "price"){
            p_symbol = (models[i].symbol == "" ? "" : "&symbol=" + models[i].symbol)
            p_unit = (models[i].unit == "" ? "" : "&unit=" + models[i].unit)
            p_exchange = (models[i].exchange == "" ? "" : "&exchange=" + models[i].exchange) 
            p_interval = (models[i].interval == "" ? "" : "&interval=" + models[i].interval)
            url += "/?" + models[i].type + p_symbol + p_unit + p_exchange + p_interval
        }else{
            p_coin = (models[i].symbol == "" ? "" : "&coin=" + models[i].symbol)
            p_datatype = (models[i].datatype == "" ? "" : "&datatype=" + models[i].datatype)
            p_interval = (models[i].interval == "" ? "" : "&interval=" + models[i].interval)
            url += "/?" + models[i].type + p_coin + p_datatype +  p_interval
        }    
    }   
        if(url == ""){
            return "/"
        }else{
            return url
        }
}

function removeModel(id1){
    for(let i = 0 ; i < View.MODELS.length ; i++){
        if(View.MODELS[i].id1 == id1){
            View.MODELS.splice(i,1) 
        }
    }
    let url_name = getURL()
    changeURL(url_name)
}

/*function that parses the url by interval, units, symbol... or whatever name, if that name doesn't exist
then return null*/
function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

function isBlockUrl(){
    if(window.location.href.includes("?block"))
    {
        return true  
    }else{
        return false
    }

}


function isPriceUrl(){
    if(window.location.href.includes("?price"))
    {
        return true  
    }else{
        return false
    }

}

function changeURL(){
    let url_name = createBrowserUrl(View.MODELS)
    console.log(url_name)  
    history.pushState(null,"",url_name)
}

function getURL(){
    uri = window.location.href
    return uri
}

module.exports = {changeURL : changeURL,
                getURL : getURL,
                isBlockUrl : isBlockUrl,
                isPriceUrl : isPriceUrl,
                removeModel : removeModel,
            }
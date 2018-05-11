const View = require('./url-models.js');

/*given all of your models create a url browser string to go with it.*/ 
function createBrowserUrl(models){
    url = ""
    for(let i = 0 ; i < models.length ; i++){
        if(models[i].type == "price"){
            p_symbol = (models[i].symbol == "" ? "" : "&symbol=" + models[i].symbol)
            p_unit = (models[i].unit == "" ? "" : "&unit=" + models[i].unit)
            p_exchange = (models[i].exchange == "" ? "" : "&exchange=" + models[i].exchange) 
            p_interval = (models[i].interval == "" ? "" : "&interval=" + models[i].interval)
            p_start = (models[i].start == "" ? "" : "&start=" + models[i].start)
            p_end = (models[i].end == "" ? "" : "&end=" + models[i].end)
            url += "/?" + models[i].type + p_symbol + p_unit + p_exchange + p_interval + p_start + p_end
        }else{
            p_coin = (models[i].symbol == "" ? "" : "&coin=" + models[i].symbol)
            p_datatype = (models[i].datatype == "" ? "" : "&datatype=" + models[i].datatype)
            p_interval = (models[i].interval == "" ? "" : "&interval=" + models[i].interval)
            p_start = (models[i].start == "" ? "" : "&start=" + models[i].start)
            p_end = (models[i].end == "" ? "" : "&end=" + models[i].end)
            url += "/?" + models[i].type + p_coin + p_datatype +  p_interval + p_start + p_end
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

 /*given a url from browser determine if it is a block or not*/
function isBlockUrl(){
    if(window.location.href.includes("?block"))
    {
        return true  
    }else{
        return false
    }

}

 /*given a url from browser determine if it is a price or not*/
function isPriceUrl(){
    if(window.location.href.includes("?price"))
    {
        return true  
    }else{
        return false
    }

}

 /*given a url from the browser determinte if it is a price or not*/
function changeURL(){
    let url_name = createBrowserUrl(View.MODELS)
    history.pushState(null,"",url_name)
    setShareLink(getURL())
}

function getURL(){
    uri = window.location.href
    return uri
}

function setShareLink(string){
    let share = document.querySelector("#share-url")
    let share_button = document.querySelector("#share-button")
    share.value = string;
    share_button.addEventListener("click", function(){
        //get the text of the input and
        share.select()
        document.execCommand("Copy");
    })
}

function getShareLink(){
    string =  document.querySelector("#share-url").value
    return string
}

module.exports = {changeURL : changeURL,
                getURL : getURL,
                isBlockUrl : isBlockUrl,
                isPriceUrl : isPriceUrl,
                removeModel : removeModel,
                getParameterByName : getParameterByName,
                setShareLink : setShareLink
            }
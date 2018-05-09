    var MODELS = []

    /* a Model is the stored data representation of a query request. User makes request using url string or dropdowns*/
    function UrlParam(id1,id2,type, symbol, unit, datatype,exchange,interval,start,end, selected){
        this.id1  = id1; 
        this.id2 = id2; 
        this.type = type; 
        this.symbol = symbol;
        this.unit = unit; 
        this.datatype = datatype;
        this.exchange =  exchange; 
        this.interval = interval; 
        this.start = start; 
        this.end = end; 
    }

    function CheckPropTypes(){
        for(let i = 0 ; MODELS.length ; i++){}
    }
    /*Check the property types of the models just as a sanity check that you are making models with right inputs*/
    /*function CheckPropTypes(){
        for(let i = 0 ; MODELS.length ; i++){
            try{
            if(typeof MODELS[i].id1 != "number"){
                throw "id1 in the Url-Model is not a number"
            }
            if(typeof MODELS[i].id2 != "number"){
                throw "id2 in the Url-Model is not a number"
            }
            if(typeof MODELS[i].type != "string"){
                throw "type in the Url-Model is not a string"
            }
            if(typeof MODELS[i].symbol != "string"){
                throw "symbol in the Url-Model is not a string"
            }
            if(typeof MODELS[i].unit != "string"){
                throw "unit in the Url-Model is not a string"
            }
            if(typeof MODELS[i].datatype != "string"){
                throw "datatype in the Url-Model is not a string"

            }if(typeof MODELS[i].exchange != "string"){
                throw "exchange in the Url-Model is not a string"

            }if(typeof MODELS[i].interval != "interval"){
                throw "interval in the Url-Model is not a string"

            }if(typeof MODELS[i].start != "number"){
                throw "start in the Url-Model is not a number"

            }if(typeof MODELS[i].end != "number"){
                throw "end in the datatype is not a number"
            }
        }catch(err){
            console.log("Check your prop types in your Url-Model")
        }
        }
    }*/

    function resetModel(){
        MODELS = []
        return MODELS
    }

module.exports = {
    MODELS : MODELS,
    UrlParam : UrlParam,
    CheckPropTypes : CheckPropTypes
}



    var MODELS = []

    /* a Model is the stored data representation of a query request. User makes request using url string or dropdowns*/
    function UrlParam(id,type, symbol, unit, datatype,exchange,interval,start,end){
        this.id  = id; 
        this.type = type; 
        this.symbol = symbol;
        this.unit = unit; 
        this.datatype = datatype;
        this.exchange =  exchange; 
        this.interval = interval; 
        this.start = start; 
        this.end = end; 
    }

    /*Check the property types of the models just as a sanity check that you are making models with right inputs*/
    function CheckPropTypes(){
        for(let i = 0 ; i < MODELS.length ; i++){
            
            if(typeof MODELS[i].id != "number"){
                console.warn("id in the Url-Model is not a number")
            }
            if(typeof MODELS[i].type != "string"){
                console.warn( "type in the Url-Model is not a string")
            }
            if(typeof MODELS[i].symbol != "string"){
                console.warn( "symbol in the Url-Model is not a string")
            }
            if(typeof MODELS[i].unit != "string"){
                console.warn( "unit in the Url-Model is not a string")
            }
            if(typeof MODELS[i].datatype != "string"){
                console.warn( "datatype in the Url-Model is not a string")

            }if(typeof MODELS[i].exchange != "string"){
                console.warn( "exchange in the Url-Model is not a string")

            }if(typeof MODELS[i].interval != "string"){
                console.warn( "interval in the Url-Model is not a string")

            }if(typeof MODELS[i].start != "number"){
                console.warn( "start in the Url-Model is not a number")

            }if(typeof MODELS[i].end != "number"){
                console.warn( "end in the datatype is not a number")
            }
        }
    }

    function resetModel(){
        MODELS = []
        return MODELS
    }

module.exports = {
    MODELS : MODELS,
    UrlParam : UrlParam,
    CheckPropTypes : CheckPropTypes
}



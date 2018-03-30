
    var PRICE_MODEL = {
        symbol : "",
        unit : "",
        datatpye: "",
        exchange : "",
        interval : "",
    }
    function resetModel(){
        PRICE_MODEL = {
            type: "",
            symbol : "",
            unit : "",
            datatpye: "",
            exchange : "",
            interval : "",
        }
        return MODEL
    }

    var BLOCK_MODEL = {
        symbol : "",
        unit : "",
        datatpye: "",
        exchange : "",
        interval : "",
    }
    function resetModel(){
        BLOCK_MODEL = {
            type: "",
            symbol : "",
            unit : "",
            datatpye: "",
            exchange : "",
            interval : "",
        }
        return MODEL
    }

module.exports ={
    PRICE_MODEL : PRICE_MODEL
}


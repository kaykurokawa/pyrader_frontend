$(document).ready(function () {

    document.getElementById("submit").onclick = function(event){
        event.preventDefault();
        console.log("clicked submit")
        Input.getPriceAPI()
    }

        document.getElementById("block-submit").onclick = function(event){
            event.preventDefault();
            console.log("clicked block")
            Input.getBlockAPI()
        }

  });
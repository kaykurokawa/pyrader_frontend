$(document).ready(function () {
    Input.getPriceAPI()

    document.getElementById("submit").onclick = function(event){
        event.preventDefault();
        console.log("clicked submit")
        Input.getPriceAPI()
    }
    document.getElementById("block-tab").onclick = function(event){
        Input.getBlockAPI()
        document.getElementById("block-submit").onclick = function(event){
            event.preventDefault();
            console.log("clicked block")
            Input.getBlockAPI()
        }
    }
  });
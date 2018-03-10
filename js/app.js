$(document).ready(function () {
    Info.getInfo()
    Input.getInitialData()
    document.getElementById("submit").onclick = function(event){
        event.preventDefault();
        Input.getPriceAPI()
    }
    document.getElementById("block-tab").onclick = function(event){
        Input.getBlockAPI()
        document.getElementById("block-submit").onclick = function(event){
            event.preventDefault();
            Input.getBlockAPI()
        }
    }
  });
$(document).ready(function () {
    Info.getInfo()
    Input.getInitialData()
    document.getElementById("submit").onclick = function(event){
        event.preventDefault();
        Input.getPriceAPI()
    }
    document.getElementById("block-tab").onclick = function(event){
        Input.getInitialBlock()
        document.getElementById("block-submit").onclick = function(event){
            event.preventDefault();
            Input.getBlockAPI()
        }
    }
  });
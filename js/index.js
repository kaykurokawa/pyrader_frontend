$(document).ready(function () {
    
    document.getElementById("submit").onclick = function(event){
        event.preventDefault();
        console.log("clicked sumbit!")
    }

        document.getElementById("block-submit").onclick = function(event){
            event.preventDefault();
            console.log("clicked block sumbit!")
        }

  });
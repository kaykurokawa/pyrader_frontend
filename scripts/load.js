const constants = require('../public/js/constants')
const fetch = require('node-fetch')
const fs = require('fs');


let url= constants.REST_URL + "/info";
fetch(url).then(response => {response.json().then( data => {
        let args = process.argv
        if(args[2] === "xmr"){
            //get only rows with XMR
            let info_json = {price : [], block : []}
            info_json.price = data.price.filter(row => {return row.symbol.includes("XMR")})
            info_json.block = data.block.filter(row => {return row.coin.includes("XMR")})
            let json = "const info_json = " + JSON.stringify(info_json) + "\n module.exports.info_json = info_json" 
            fs.writeFile("./public/js/info_data.js", json, function(err) {
                if(err) {
                    return console.log(err);
                } 
                console.log("Information was loaded and saved in info_data.js");
            }); 

        }else if(args[2] === "xmo"){ 
            //get only rows with XMO
            let info_json = {price : [], block : []}
            info_json.price = data.price.filter(row => {return row.symbol.includes("XMO")})
            info_json.block = data.block.filter(row => {return row.coin.includes("XMO")})
            let json = "const info_json = " + JSON.stringify(info_json) + "\n module.exports.info_json = info_json" 
            fs.writeFile("./public/js/info_data.js", json, function(err) {
                if(err) {
                    return console.log(err);
                } 
                console.log("Information was loaded and saved in info_data.js");
            }); 
        }else{
            let json = "const info_json = " + JSON.stringify(data) + "\n module.exports.info_json = info_json" 
            fs.writeFile("./public/js/info_data.js", json, function(err) {
                if(err) {
                    return console.log(err);
                } 
                console.log("Information was loaded and saved in info_data.js");
            }); 
        }
    });
})

//4. aditionally take in arguments using process.argv to take in only XMR, XMO, etc..

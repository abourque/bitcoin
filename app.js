const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname +"/quote.html");
    //res.end;
});

app.post("/", (req,res)=>{
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var myurl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + crypto + fiat;
    //console.log(myurl);
    //res.send(price);
    
    request(myurl, function(error, response, body){
    
        console.log("error : ", error);
        console.log("status code: ", response && response.statusCode);
        var json = JSON.parse(body);
        var price = json.last;
        //console.log(json.last);
        res.send("<h1>The crypto ratio is " + price + "</h1>");
        
        });
    
});

app.listen(3000, ()=>{
    console.log("listening on port 3000");
});

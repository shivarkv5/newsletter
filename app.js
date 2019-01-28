const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
    var password = req.body.password;

    var data ={
        members:[
            {
                email_address : email,
                status:"subscribed",
                merge_fields:{
                    FNAME: fName,
                    LNAME:lName,
                    PASSWORD :password,
                }
            }
        ]
    }
var jsonData= JSON.stringify(data);
    var options={
        url:"https://us20.api.mailchimp.com/3.0/lists/d3da0c218b",
        method:"POST",
        headers:{
            "Authorization":"srkv 3a94b049e82220cff335e9c1006ea8fd-us20"
        },
     body:jsonData,
    }

    request(options,function(error,response,body){
        if(error){
            console.log(error);
            res.sendFile(__dirname+"/failure.html");
        }else{
            if(response.statusCode === 200){
                console.log(response.statusCode);
                res.sendFile(__dirname+"/success.html");
            }
            else{
            res.sendFile(__dirname+"/failure.html");
            }   
        }
    });
    console.log("Got a request and this is the response"+ " "+fName+" "+lName+" "+email+" "+password);
});

app.post("/failure" , function(req,res){
   res.redirect("/");
});


app.listen(process.env.PORT ||3000, ()=>console.log("Server established at localhost:3000"));

//3a94b049e82220cff335e9c1006ea8fd-us20  - API KEY

//d3da0c218b- List ID

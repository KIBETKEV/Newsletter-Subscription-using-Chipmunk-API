import express from 'express'
import bodyParser from 'body-parser'
import request from 'request'
import https from 'https'
import { dirname } from 'path';


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
res.sendFile("/Users/kelvinkibet/Desktop/WebDev/Newsletter-Signup/signup.html");
});

app.post("/",  function (req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const mailAdd = req.body.email;

    console.log(firstName, lastName,  mailAdd)


    const data = {
        members: [{
            email_address: mailAdd,   //data must match mailchimp's expected keys
          status: "subscribed",
            merge_field: {
               FNAME: firstName,
                LNAME: lastName,
            }
        }]
    };
    const jsonData = JSON.stringify(data);

    const url = "https:us14.api.mailchimp.com/3.0/lists/8df04d1edb";
    const options = {
        method: "POST",
        auth: "Kev:bad5ddfc9d75fde5264ce8bab51ee40a-us14"
         }
     const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(dirname__ +"/success.html");
        } else {
            res.sendFile(dirname__ +"/failure.html");
       };
        response.on("data", function(data){

        })
    })
    request.write(jsonData);
    request.end();
});


app.listen(3000, function(){
    console.log("Server is running")
});

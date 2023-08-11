const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
    var name = req.body.text;
    var mail = req.body.email;

    var data = {
        members: [
            {
                email_address: mail,
                status: "subscribed",
                merge_fields: {
                    FNAME: name,
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data);
    const url = "mailchimp url server kew and public kew";
    const option = {
        method: "POST",
        auth: "mailchimp api key",
    }
    const request = https.request(url, option, function (response) {
        response.on("data", function (data) {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            }
            else
                res.sendFile(__dirname + "/failure.html");
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure",function (req,res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Server is Online !");
});

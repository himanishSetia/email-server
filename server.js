var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noneedtoreplyprofile@gmail.com',
      pass: 'profilE@123'
    }
  });

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));


var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/sendMail',function(req,res){
  var tempData = '<!DOCTYPE html><html lang="en"><body><style>.outer{position: absolute;left: 50%;top: 50%;border: 5px solid #a35656;padding: 10px 10px 10px 10px;font-family: berlin sans fb;}   .header{    text-align: center;font-weight: bold;font-size: 2em;} </style><div class="outer"><div class="header">Profile</div><hr><table cellpadding="10"><tr><td>Name</td><td>'+req.query.name+'</td></tr><tr><td>Email</td><td>'+req.query.email+'</td></tr><tr><td>Occupation</td><td>'+req.query.occupation+'</td></tr><tr><td>Comment</td><td>'+req.query.comment+'</td></tr></table></div></body></html>'
    var mailOptions = {
        from: 'noneedtoreplyprofile@gmail.com',
        to: 'hsetia94@gmail.com',
        subject: 'Profile Feedback',
        html: tempData
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.json({"message":"Mail not sent","status":"failure"});
        } else {
          console.log('Email sent: ' + info.response);
          res.json({"message":"Mail sent successfully","status":"success"});
        }
      });
})

router.get('/reduce',function(req,res){
  var arr = []

  if(req.query.map != '' && req.query.map != undefined && req.query.map != null){
  var sampleData = req.query.map.split(" ");

  var temp = []
  

  sampleData.forEach(function(obj){
    if(temp.indexOf(obj.toUpperCase()) == -1){
      temp.push(obj.toUpperCase());
      arr.push({text:obj,weight:0});
    }
  })
  sampleData.forEach(function(obj){
    arr.forEach(function(redObj){
      if(obj.toUpperCase() == redObj.text.toUpperCase()){
        redObj.weight = redObj.weight + 1;
      }
    })
  })
  res.json({"data":arr,"status":"success","message":"Success"});  
  }else{
    res.json({"data":arr,"status":"faliure","success":"Map cannot be blank"});  
  }
  

});

app.use('/api',router);

app.listen(port);

console.log("Server started on port "+port)

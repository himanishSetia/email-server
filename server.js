var express = require('express');
var app = express();
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

app.use('/api',router);

app.listen(port);

console.log("Server started on port "+port)

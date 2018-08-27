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
    var mailOptions = {
        from: 'noneedtoreplyprofile@gmail.com',
        to: 'hsetia94@gmail.com',
        subject: 'Profile Feedback',
        text: req.query.comment
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

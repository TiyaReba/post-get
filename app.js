const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
// db connection
mongoose.connect('mongodb+srv://soorya:arya@clustertms.kfgrkm3.mongodb.net/TMS?retryWrites=true&w=majority')
console.log("Mongo DB connected ...")
const TrainerData = require('./src/model/TMSmodel')
const FormData = require('./src/model/enrollmentmodel')
const UserData = require('./src/model/UserData');
const allocationdata = require('./src/model/allocationdata')
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'tmsictak22@gmail.com',
    pass: 'otmqtugvitsptyaj'
  }
});
var ID = "";
const app = new express();
app.use(cors());
app.use(bodyparser.json());

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("unauthorized request");
  }

  let token = req.headers.authorization.split(" ")[1];

  if (token == "null") {
    return res.status(401).send("unauthorized request");
  }

  let payload = jwt.verify(token, "secretKey");
  console.log(payload);

  if (!payload) {
    return res.status(401).send("unauthorized request");
  }
  req.userId = payload.subject;
  next();
}
const path = require('path');

// app.use(express.static('Frontend/dist/tmsportal'));

let api_prefix = "/api/";

// SIGNUP data is taken and store to data base
app.post(api_prefix + "signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new UserData({
      email: req.body.email,
      password: hash,
    });

    UserData.findOne({ email: req.body.email })
      .then((user1) => {
        if (user1) {
          return res.status(401).json({
            message: "User Already Exist",
        });
        }
user.save().then((result) => {
          if (!result) {
            return res.send({
              message: "Error Creating USer",
            });
          }
          res.send({message:"success"});
        });
      })
      .catch((err) => {
        res.send({
          message: err,
        });
      });
  });
});

// login check the informations

app.post(api_prefix + "login", (req, res, next) => {
  let fetchedUser;
  let email = req.body.email;
  console.log("login check", req.body.email);
  UserData.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.send({
          message: " failed ",
          
        });
        return;
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (result) {
        let payload = { subject: req.body.email + req.body.password };
        let token = jwt.sign(payload, "secretKey");

        if (req.body.email != "tmsictak22@gmail.com") {
          FormData.findOne({ email: req.body.email }, function (trainer, err) {
            if (trainer) {
              approved = trainer.approved;
              res.status(200).send({ tok: token, approval: approved });
            } else {
              res
                .status(200)
                .send({ tok: token, approval: "", email: req.body.email });
            }
          });
        } else {
          res.status(200).send({ tok: token, approval: "", email });
          console.log("f" + fetchedUser);
        }
      }
      if (!result) {
        return res.send({
          message: " failed ",
        });
      }
    });
});

//  to get details in trainer list page

app.get(api_prefix + "trainerlist", verifyToken, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
  FormData.find({ approved: true }).then(function (trainers) {
    res.send(trainers);
  });
});

// for posting enrollmentform for trainer

app.post(api_prefix + "form", verifyToken, function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
  console.log("body :" + req.body);
  console.log("trainer name :" + req.body.image);
  var newtrainer = {
    image:req.body.image,
    trainername: req.body.trainername,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    qualification: req.body.qualification,
    skills: req.body.skills,
    currentcompanyname: req.body.currentcompanyname,
    currentdesignation: req.body.currentdesignation,
    courses: req.body.courses,
    approved: false,
  };

  try {
    var trainercollection = new FormData(newtrainer);
    trainercollection.save();
    res.json(trainercollection);
  } catch (err) {
    res.send("Error" + err);
  }
});

// to delete trainerdata by admin in trainer profile

app.delete(api_prefix + "trainerprofiles/delete/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  FormData.findByIdAndDelete({ _id: id }).then(() => {
    console.log("trainer deleted");
    res.send();
  });
});

// to recognize the id in the admin page

app.get(api_prefix + "trainer/:id",verifyToken, function (req, res) {
  const id = req.params.id;
  console.log("trainer id is",id);
  FormData.findOne({ _id: id }).then(function (trainers) {
    res.send(trainers);
  });
});

// to allocate each trainer

app.put(api_prefix + "allocate", verifyToken, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
  console.log("startdate :" + req.body.startdate);
   const id = req.body._id;
  console.log("id in allocate:",req.body._id);
  (startdate = req.body.startdate),
    (enddate = req.body.enddate),
    (starttime = req.body.starttime),
    (endtime = req.body.endtime),
    (courses = req.body.courses),
    (courseid = req.body.courseid),
    (batchid = req.body.batchid),
    (link = req.body.link);
  FormData.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        startdate: startdate,
        enddate: enddate,
        starttime: starttime,
        endtime: endtime,
        courses: courses,
        courseid: courseid,
        batchid: batchid,
        link: link,
      },
    }
  ).then(function (trainers) {
    var mailOptions = {
      from: 'tmsictak22@gmail.com',
       to: trainers.email,
      subject: 'Trainer Allocation Details',
     
      html:`<p>'Dear sir/mam,<br>We have completed your allocation process.Please find the details below:<br>
      StartDate:${req.body.startdate},Enddate:${trainers.enddate},Coursename:${trainers.courses},CourseID:${trainers.courseid},BatchID:${trainers.batchid},link:${trainers.link}
      <br>From,TMS Admin
      </p>`
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
         

    res.send(trainers);
  })
  });

// to search name
app.put(api_prefix + "find", verifyToken, async function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
  console.log("search string", req.body);
  console.log("search body",req.body.find.text)
 
  try {
    var regex = new RegExp(req.body.find.text,'i');
    var trainers = await FormData.find({ $and:[{$or: [{trainername:regex}, {skills:regex},{courses:regex},{type:regex}]},{"approved":true}] })
  
  } catch (e) {
    res.status(500).send();
  }
  res.send(trainers);
  console.log(trainers)
});


//to load invidual trainer profile
app.get(api_prefix + "trainerprofile/:email", verifyToken, (req, res) => {
  
  const email = req.params.email;
  FormData.findOne({ $and: [{ email: email }, { approved: true }] }).then(
    function (trainer) {
      res.send(trainer);
    }
  );
});
// for profile loading while profile edit
app.get(api_prefix + "trainerProfile/:email",verifyToken, (req, res) => {
  const email= req.params.email;
  console.log("trainer id for edit in  profile", id);
  FormData.findOne({ email: email}).then((trainers) => {
    res.send(trainers);
  });
});
//for editing profile
app.put(api_prefix + "trainerProfile/edit",verifyToken, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
  console.log("body for edit:" + req.body.image);
  console.log("editprofile=",req.body.trainername)
 const  id = req.body.id,
 image=req.body.image,
 trainername=req.body.trainername,
 email=req.body.email,
 phone=req.body.phone,
 address=req.body. address,
 qualification=req.body.qualification,
 skills=req.body.skills,
 currentcompanyname=req.body.currentcompanyname,
 currentdesignation=req.body.currentdesignation,
 courses=req.body. courses;
  FormData.findOneAndUpdate(
    { email: email },
    {
      $set: {
        "trainername": trainername,
        "email": email,
        "phone": phone,
        "address": address,
        "qualification": qualification,
        "skills": skills,
        "currentcompanyname": currentcompanyname,
        "currentdesignation": currentdesignation,
        "courses": courses,
        "image":image
      },
    }
  ).then(function () {
    res.send();
  });
});

app.get(api_prefix + "requests", verifyToken,function (req, res) {
  console.log("Request page");
  FormData.find({"approved":false})
  .then(function(trainerss){
      res.send(trainerss);
    })
  })
  //to accept requests
  app.put(api_prefix + "requests/accept", verifyToken,function (req, res) {
    const id = req.body.id;
    var value = Math.floor(Math.random() * 2000);
    var newid = "TMS" + value.toString();
    var type = req.body.type;
    console.log('req.params',req.params);
    console.log('req.body',req.body);
    console.log('req.query',req.query);
    console.log("id",id);
    console.log("newId",newid);
    console.log("type",type);
    FormData.findByIdAndUpdate(
      { _id: id },
      { $set: { approved: true, ID: newid, type : type} }
    ).then(function (trainers) {
      var mailOptions = {
        from: 'tmsictak22@gmail.com',
         to: trainers.email,
        subject: 'Selected as a Trainer at ICT',
       
        html:`<p>'Thank you for taking the time to apply for the trainer position.We have completed all of our procedures.Congratulations!! you have been selected .Please find the details below:<br>
        Type of employment:${type},Trainer ID:${trainers.newid}</p>
        <br>
        From TMS Admin`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
             res.send(trainers);
           })
 
      
    });
       //to delete requests and send mail   
     app.delete(api_prefix + 'requests/delete/:id',verifyToken,function(req,res){
    const id = req.params.id;
                  FormData.findByIdAndDelete({_id:id}) 
                  .then(function(trainers){
                    var mailOptions = {
                      from: 'tmsictak22@gmail.com',
                       to: trainers.email,
                      subject: 'Unfortunately you are not selected',
                      text: 'Thank you for applying for Trainer at ICT. Our hiring team has reviewed your application and decided to proceed with other candidates. We wish you luck on your search for your next career opportunity.<br>From TMS Admin'
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                      } 
                      else {
                    console.log('Email sent: ' + info.response);}
                  })
                  });
                    res.send(trainers);
                    console.log("deleted successfully");
  })

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/Frontend/dist/tmsportal/index.html'))});

app.listen(process.env.PORT || 3000, function(){
      console.log('listening to port 3000');
  });

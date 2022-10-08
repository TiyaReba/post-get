const express  = require("express");
const cors = require('cors');
const TrainerData = require('./src/model/TMSmodel')
const FormData = require('./src/model/enrollmentmodel')
const UserData = require('./src/model/UserData');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const jwt =require('jsonwebtoken');

const app = new express();
mongoose.connect('mongodb+srv://soorya:arya@clustertms.kfgrkm3.mongodb.net/TMS?retryWrites=true&w=majority')
// db connection
//mongoose.connect('mongodb+srv://tiya:post24@cluster0.qh8z9se.mongodb.net/TMSPortal?retryWrites=true&w=majority')
console.log("Mongo DB connected ...")

app.use(cors());
app.use(bodyparser.json());
function verifyToken(req,res,next){
    
  if(!req.headers.authorization){
    return res.status(401).send('unautharized request');
  }

  let token= req.headers.authorization.split(' ')[1]

  if(token=='null'){
    return res.status(401).send('unautharized request');
  }

  let payload= jwt.verify(token,'secretkey')
  console.log(payload)

  if(!payload){
    return res.status(401).send('unautharized request');
  }
  req.userId=payload.subject
  next()
}

// SIGNUP data is taken and store to data base
app.post('/signup',(req,res)=>{
  let userData=req.body
  
  var user={
      useremail:userData.email,
      userpassword:userData.password
  }
  console.log(user)
  var users= new UserData (user);
  users.save()
  });
  // login check the informations

app.post('/login',(req,res)=>{
  
  let userData=req.body
 
  UserData.findOne({"email":userData.useremail, "password":userData.userpassword},(err,user)=>{
    if(err) throw new Error(err);
            if(!user) 
              { res.status(401).send('User not registered.Please sign up');}
   if(user){
       console.log('SUCCESSFULLY LOGGEDIN');

   let payload = {subject:userData.useremail+userData.userpassword}
   let token = jwt.sign(payload,'secretkey')
   res.status(200).send({token})
   }
   else{
       console.log('FAILED TO LOGIN');
       res.status(401).send('invalid credential');
       
   }
  })
   })

app.get('/trainerlist',verifyToken,function(req,res) {
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
   FormData.find()
      .then(function(trainers){
         res.send(trainers);
})
})

// for posting enrollmentform

app.post('/form',verifyToken,function(req,res){
  res.header("Access-Control-Allow-Origin",'*');
  res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
  console.log('body :'+ req.body)
  console.log("trainer name :" + req.body.trainername)
  var newtrainer ={
    trainername:req.body.trainername,
    email:req.body.email,
    phone:req.body.phone,
    address:req.body.address,
    qualification:req.body.qualification,
    skills:req.body.skills,
    currentcompanyname:req.body.currentcompanyname,
    currentdesignation:req.body.currentdesignation,
    courses:req.body.courses
}

try{
    var trainercollection = new FormData(newtrainer)
    trainercollection.save();
    res.json(trainercollection);
}catch(err){
   res.send('Error' + err)
}
})



app.listen(3000);
console.log("port 3000");


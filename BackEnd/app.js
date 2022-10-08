const express  = require("express");
const cors = require('cors');
const TrainerData = require('./src/model/TMSmodel')
const FormData = require('./src/model/enrollmentmodel')
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = new express();

// db connection
// mongoose.connect('mongodb+srv://tiya:post24@cluster0.qh8z9se.mongodb.net/TMSPortal?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://soorya:arya@clustertms.kfgrkm3.mongodb.net/TMS?retryWrites=true&w=majority')
console.log("Mongo DB connected ...")

app.use(cors());
app.use(bodyparser.json());

app.get('/trainerlist',function(req,res) {
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
   FormData.find()
      .then(function(trainers){
         res.send(trainers);
})
})

// for posting enrollmentform

app.post('/form',function(req,res){
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



app.get('/trainerlist/search', (req,res)=>{
  res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
   FormData.findone()
      .then(function(trainers){
         res.send(trainers);

})

})

app.listen(3000);
console.log("port 3000");


const express  = require("express");
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const jwt =require('jsonwebtoken');
const bcrypt = require("bcrypt");
// db connection
mongoose.connect('mongodb+srv://soorya:arya@clustertms.kfgrkm3.mongodb.net/TMS?retryWrites=true&w=majority')
console.log("Mongo DB connected ...")

const TrainerData = require('./src/model/TMSmodel')
const FormData = require('./src/model/enrollmentmodel')
const UserData = require('./src/model/UserData');
const allocationdata = require('./src/model/allocationdata')
const app = new express()
app.use(cors());
app.use(bodyparser.json());



function verifyToken(req,res,next){
    
  if(!req.headers.authorization){
    return res.status(401).send('unauthorized request');
  }

  let token= req.headers.authorization.split(' ')[1]

  if(token=='null'){
    return res.status(401).send('unauthorized request');
  }

  let payload= jwt.verify(token,'secretkey')
  console.log(payload)

  if(!payload){
    return res.status(401).send('unauthorized request');
  }
  req.userId=payload.subject
  next()
}

// SIGNUP data is taken and store to data base
app.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new UserData({
      email: req.body.email,
      password: hash
    });

    UserData.findOne({email:req.body.email}).then(user1=>{
      if(user1){
        return res.status(401).json({
          message: "User Already Exist"
        })
      }

      user.save().then(result => {
        if(!result){
          return res.status(500).json({
            message: "Error Creating USer"
          })
        }
        res.status(201).json({
          message: "User created!",
          result: result
        });
    })
      })   
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });;
  })
 
});
 
  

    

 
  // login check the informations

  app.post("/login", (req, res, next) => {
    let fetchedUser;
  
    UserData.findOne({email:req.body.email}).then(user=>{
      if(!user){
        return res.status(401).json({
          message: "Auth failed no such user"
        })
      }
      fetchedUser=user;
      return bcrypt.compare(req.body.password, user.password);
     
    }).then(result=>{
      if (result){
        let payload = {subject: req.body.email+req.body.password}
                    let token = jwt.sign(payload, 'secretKey')
        
        res.status(200).send({tok:token,result})
      console.log("f"+fetchedUser)
      }
      if(!result){
        return res.status(401).json({
          message: "Auth failed incorrect password"
        })
      }
    })
  })
    
  //  to get details in trainer list page

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


// to delete trainerdata by admin

app.delete('/trainerprofiles/delete/:id',verifyToken, (req,res)=>{
  const id = req.params.id;
  FormData.findByIdAndDelete({"_id":id})
  .then(()=>{
    console.log('trainer deleted');
    res.send();
  })
})
// to allocate each trainer

app.post('/allocate',(req,res) =>{
  res.header("Access-Control-Allow-Origin",'*');
  res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
  console.log('body for allocation:'+ req.body)
  console.log("startdate :"+ req.body.startdate)
  var allocatedtrainer ={
    startdate:req.body.startdate,
    enddate:req.body.enddate,
    starttime:req.body.starttime,
    endtime:req.body.endtime,
    courses:req.body.courses,
    courseid:req.body.courseid,
    batchid:req.body.batchid,
    link:req.body.link 
}

try{
    var allocationcollection = new allocationdata(allocatedtrainer)
    console.log("inside try", allocationcollection)
    allocationcollection.save();
    res.json(allocationcollection);
}catch(err){
   res.send('Error' + err)
}

})

// to search 
app.get('/find/:name',async function(req,res){

     console.log("search string",req.params.name);
     try
     {
      // if (req.query.field === "trainername")
      //   var trainers = await FormData.find({trainername : {$regex: req.query.search , $options: 'i'}});
      // if (req.query.field === "email")
      //   var trainers = await FormData.find({email : {$regex: req.query.search , $options: 'i'}});        
      // if (req.query.field === "skills")
      //   var trainers = await FormData.find({skills : {$regex: req.query.search , $options: 'i'}});   
      var trainers = await FormData.find({$or :[{trainername:{$regex:req.params.name, $options:'i'}}]})
     }
     catch (e)
     {
      res.status(500).send();
     }
     res.send(trainers);
    }); 




app.listen(3000);
console.log("port 3000");


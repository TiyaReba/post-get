const express  = require("express");
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const jwt =require('jsonwebtoken');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
// db connection
mongoose.connect('mongodb+srv://soorya:arya@clustertms.kfgrkm3.mongodb.net/TMS?retryWrites=true&w=majority')
console.log("Mongo DB connected ...")

const TrainerData = require('./src/model/TMSmodel')
const FormData = require('./src/model/enrollmentmodel')
const UserData = require('./src/model/UserData');
const allocationdata = require('./src/model/allocationdata')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tmsictak22@gmail.com',
    pass: 'STR@ictak22'
  }
});

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

  let payload= jwt.verify(token,'secretKey')
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
    let email= req.body.email;
    console.log("login check",req.body.email)
    UserData.findOne({email:email}).then(user=>{
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
            
                    if(req.body.email!="tmsictak22@gmail.com"){
                      FormData.findOne({email:req.body.email},function(trainer,err) {
                        if(trainer){
                          approved=trainer.approved;
                          res.status(200).send({tok:token,approval:approved})}
                          else{
                            res.status(200).send({tok:token,approval:'',email:req.body.email})
                          }
                      })}
                      else{
        res.status(200).send({tok:token,approval:'',email})
      console.log("f"+fetchedUser)}
      }
      if(!result){
        return res.status(401).json({
          message: "Auth failed incorrect password"
        })
      }
    })
  })
    
  //  to get details in trainer list page

app.get('/trainerlist',(req,res)=> {
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
   FormData.find({"approved":true})
      .then(function(trainers){
         res.send(trainers);
})
})

// for posting enrollmentform for trainer

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
    courses:req.body.courses,
    approved:false
}

try{
    var trainercollection = new FormData(newtrainer)
    trainercollection.save();
    res.json(trainercollection);
}catch(err){
   res.send('Error' + err)
}
})


// to delete trainerdata by admin in trainer profile

app.delete('/trainerprofiles/delete/:id',verifyToken, (req,res)=>{
  const id = req.params.id;
  FormData.findByIdAndDelete({"_id":id})
  .then(()=>{
    console.log('trainer deleted');
    res.send();
  })
})

  // to recognize the id in the admin page
    
  app.get('/trainer/:id',function(req,res){
    const id = req.params.id; 
  FormData.findOne({_id:id})  
   .then(function(trainers){
       res.send(trainers);
    })
  });

// to allocate each trainer

app.put('/allocate',(req,res) =>{
  res.header("Access-Control-Allow-Origin",'*');
  res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
  console.log('body for allocation:'+ req.body)
  console.log("startdate :"+ req.body.startdate)
  id=req.body._id,
  console.log("id in update:",id);
    startdate=req.body.startdate,
    enddate=req.body.enddate,
    starttime=req.body.starttime,
    endtime=req.body.endtime,
    courses=req.body.courses,
    courseid=req.body.courseid,
    batchid=req.body.batchid,
    link=req.body.link 
    FormData.findOneAndUpdate({"_id":id}, {$set:{"startdate":startdate,
    "enddate":enddate,
    "starttime":starttime,
    "endtime":endtime,
    "courses":courses,
    "courseid":courseid,
    "batchid":batchid,
    "link":link
   }})
.then(function(){
res.send();
})
})


// to search 
app.get('/find/:name',async function(req,res){
  res.header("Access-Control-Allow-Origin",'*');
  res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
     console.log("search string",req.params.name);
     try
     {
      // if (req.query.field === "trainername")
      //   var trainers = await FormData.find({trainername : {$regex: req.query.search , $options: 'i'}});
      // if (req.query.field === "email")
      //   var trainers = await FormData.find({email : {$regex: req.query.search , $options: 'i'}});        
      // if (req.query.field === "skills")
      //   var trainers = await FormData.find({skills : {$regex: req.query.search , $options: 'i'}});   
      var trainers = await FormData.find({$and :[{trainername:{$regex:req.params.name, $options:'i'}},{approved:true}]})
     }
     catch (e)
     {
      res.status(500).send();
     }
     res.send(trainers);
    }); 

//to load invidual trainer profile
app.get('/trainerprofile/:email',verifyToken,(req,res)=>{
  const email=req.params.email;
  
  FormData.findOne({$and:[{"email":email},{"approved":true}]})
  .then(function(trainer){
    res.send(trainer);
  })
}
)

app.get('/requests',function(req,res){
  console.log("Request page");
  FormData.find({"approved":false})
  .then(function(trainerss){
      res.send(trainerss);
    })
  })
    app.get('/requests/accept/:id',verifyToken,function(req,res){
        
      const id = req.params.id;
  FormData.findByIdAndUpdate({_id:id},{$set:{"approved":true}})
         .then(function(trainers){
          console.log("accepted");
          res.send(trainers);
                })
              });
     app.delete('/requests/delete/:id',verifyToken,function(req,res){
    const id = req.params.id;
                  FormData.findByIdAndDelete({_id:id}) 
                  .then(function(trainers){
                    res.send(trainers);
                    console.log("deleted successfully");
  })

});


app.listen(3000);
console.log("port 3000");

  
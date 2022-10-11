const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const TrainerForm = new Schema({
   
   
    trainername:String,
    email:String,
    phone:Number,
    address:String,
    qualification:String,
    skills:String,
    currentcompanyname:String,
    currentdesignation:String,
    courses:String,
    approved:Boolean,
    employment:String,
    startdate:Number,
    enddate:Number,
    starttime:Number,
    endtime:Number,
    courses:String,
    courseid:String,
    batchid:String,
    link:String
})

// const form = mongoose.model("trainerlist",TrainerForm);
module.exports = mongoose.model("trainers",TrainerForm);
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const TrainerForm = new Schema({
   
    image:String,
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
    startdate:String,
    enddate:String,
    starttime:String,
    endtime:String,
    courses:String,
    courseid:String,
    batchid:String,
    link:String,
    ID:String,
    type:String
})

// const form = mongoose.model("trainerlist",TrainerForm);
module.exports = mongoose.model("trainers",TrainerForm);
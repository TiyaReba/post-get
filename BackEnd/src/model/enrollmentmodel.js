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
    courses:String
})

// const form = mongoose.model("trainerlist",TrainerForm);
module.exports = mongoose.model("trainers",TrainerForm);
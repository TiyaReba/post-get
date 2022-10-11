const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const allocationForm = new Schema({
    startdate:String,
    enddate:String,
    starttime:String,
    endtime:String,
    courses:String,
    courseid:String,
    batchid:String,
    link:String
})

// const form = mongoose.model("trainerlist",TrainerForm);
module.exports = mongoose.model("trainerallocated",allocationForm);
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const Trainer = new Schema({
    // trainerid: String,
    // trainername:String,
    skills:String,
    email:String,
    imageurl:String
})

const trainerlist = mongoose.model('trainer',Trainer);
module.exports = trainerlist;
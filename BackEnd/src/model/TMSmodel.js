const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/TMSPortal');

// mongoose.connect('mongodb+srv://tiya:post24@cluster0.qh8z9se.mongodb.net/TMSPortal?retryWrites=true&w=majority')

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
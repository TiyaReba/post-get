var mongoose=require('mongoose');

const Schema=mongoose.Schema;

var UserSchema= new Schema({
    email:String,
    password:String,
    userCategory:String
})
var UserData = mongoose.model('user',UserSchema);
module.exports=UserData;

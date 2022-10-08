var mongoose=require('mongoose');

const Schema=mongoose.Schema;

var UserSchema= new Schema({
    useremail:String,
    userpassword:String
})
var UserData = mongoose.model('user',UserSchema);
module.exports=UserData;

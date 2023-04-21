const mongoose= require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type:String,
        required: true,
    },
    Age:{
        type:String,
        required: true,
    }
}, {timestamps:true});

const User=mongoose.model('User',UserSchema);
module.exports=User;

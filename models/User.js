const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        minlegth:6,
        maxlength:20,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        minlegth:10,
        maxlength:40,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        minlegth:6,
    },
    admin:{
        type:Boolean,
        default:false,
    },
},
    {timestamps:true}
);

module.exports = mongoose.model("User",userSchema);
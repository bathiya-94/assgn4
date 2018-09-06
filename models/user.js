let mongoose = require('mongoose');


let userSchema = mongoose.Schema({
    userID:{
        type: String,
        required: true,
        unique: true
    },

    name:{
        type: String,
        required: true
    },


    

});

let User = module.exports = mongoose.model('User',userSchema);
const mongoose = require('mongoose')

const Userschema = mongoose.Schema({
   city : {
    type : String,
    required : [true, 'enter a valid city']
   } , 
    apikey : {
        type : String
        
    }

})

module.exports = mongoose.model("User",Userschema);
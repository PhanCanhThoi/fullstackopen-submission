const mongoose = require('mongoose')

mongoose.set('strict',false)

const url = process.env.MONGODB_URI
mongoose.connect(url)
.then(result =>{
    console.log('connected to MongoDB')
})
.catch(error=>{
    console.log('error connecting to MongoDB',error.message)
})

const personSchema = new mongoose.Schema({
    name: {
        type:String,
        minLength:3,
        required:true
    },
    number:{
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! Format must be XX-XXXXXXX`
    }
    },
})

personSchema.set('toJSON',{
    transform: (document,returnedObject)=>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Person',personSchema)
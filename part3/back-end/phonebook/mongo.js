const mongoose = require('mongoose')
if(process.argv.length<3){
    console.log('give password a s argument')
    process.exit(1)
}
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
url = `mongodb+srv://fullstack:${password}@opensubmission.8bqdkny.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=opensubmission`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name:String,
    number:String
})

const phoneBook = mongoose.model('person',personSchema)

const person = new phoneBook({
    name: name,
    number: number
})
if(!name || !number){
phoneBook.find({}).then(result =>{
    console.log('Phone Book')
    result.forEach(phonebook=>{
        console.log(`${phonebook.name} ${phonebook.number}`)
    })
    mongoose.connection.close()
})
}else{
person.save().then(
    result=>{
        console.log(`added ${result.name} number ${result.number}`)
        mongoose.connection.close()
    }
)

}

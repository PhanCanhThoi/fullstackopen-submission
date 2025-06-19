require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
const Person = require('./models/persons')
const morgan = require('morgan')
const mongoose = require('mongoose')

mongoose.set('toJSON',{
  transform:(document,returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//custom token de log body neu la post
morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})
const loggerFomat = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(loggerFomat))

//Delete person
app.delete('/api/persons/:id', async (request, response,next) => {
  const id = request.params.id;
  try {
    await Person.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    next(error)
  }
});
//update person
app.put('/api/persons/:id',async (request,response,next)=>{
    const id = request.params.id
    const personToUpdate = request.body
    try{
      const updatedPerson =await Person.findByIdAndUpdate(id, personToUpdate, { new: true });
      if(!updatedPerson){
        return response.status(404).json({ error: 'Person not found' });
      }
       response.json(updatedPerson);
    }
    catch (error) {
    next(error)
  }
})

//Create person 
app.post('/api/persons', async (request, response, next) => {
  const { name, number } = request.body

  try {
    const existingPerson = await Person.findOne({ name })
    if (existingPerson) {
      return response.status(400).json({
        error: 'person already exists'
      })
    }

    const person = new Person({ name, number })
    const savedPerson = await person.save()
    response.json(savedPerson)

  } catch (error) {
    next(error) // Gửi lỗi tới middleware xử lý lỗi
  }
})

//get person by Id 
app.get('/api/persons/:id',(request,response,next)=>{
    Person.findById(request.params.id).then(person=>{
      console.log(person)
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error=>{
      next(error)
    })
})

//render number person current in app 
app.get('/info',(request,response)=>{
    const countPerson = persons.length
    const date = new Date();
    response.send(
        `<!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <p>Phonebook has info for <strong>${countPerson}</strong> people</p>
        <p>${date}</p>
      </body>
    </html>`
    )
})


//Select all person
app.get('/api/persons', async (req, res,next) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    next(error);
  }
});

//handle error
const errorHandler = (error,request,response,next)=>{
  console.log(error.name,error.message)
  if(error.name === 'CastError')
  {
    return response.status(400).send({error: 'malformatted id'})
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  response.status(500).json({error:'internal server error'})
}
app.use(errorHandler)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
const PORT =process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
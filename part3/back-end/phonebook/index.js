const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
//custom token de log body neu la post
morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})
const loggerFomat = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(loggerFomat))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
//Delete person
app.delete('/api/persons/:id',(request,response)=>{
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})
//Create person 
const generateID =()=>{
    const id = Math.floor(100000+Math.random() * 900000)
    return String(id)
}
app.post('/api/persons',(request,response)=>{
    const body = request.body
    const personrequest = persons.find(p=> p.name===body.name)
    if(personrequest){
        return response.status(400).json({
        error:'persons already exists'
        })
    }
    if(!body.name){
        return response.status(400).json({
        error:'name must be unique'
        })
     }
     if(!body.number){
        return response.status(400).json({
        error:'number must be unique'
        })
     }

    const person = {
        id:generateID(),
        name: body.name,
        number:body.number
    }
    persons = persons.concat(person)
    response.json(person)
    
})

//get person by Id 
app.get('/api/persons/:id',(request,response)=>{
    const id = String(request.params.id)
    const person = persons.find(p=> p.id===id)
    if(person){
        response.send(
        `<!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <p>${person.name} : ${person.number}</p>

      </body>
    </html>`
        )
    }else{
        response.send(
            `<!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
           <p>Person not found</p> 
      </body>
    </html>`
        )
    }
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
app.get('/api/persons',(request,response)=>{
    response.json(persons).end()
})

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
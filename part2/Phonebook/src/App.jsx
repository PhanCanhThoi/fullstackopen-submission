import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons.js'
import Filter from './components/Filter.jsx'    
import PersonForm from './components/PersonForm.jsx'  
import ShowNotes from './components/ShowNotes.jsx'
import ShowPersons from './components/ShowPersons.jsx'
import PhoneError from './components/PhoneError.jsx'
function App() {
  const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [notes, setNotes] = useState([])
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const hook = () => {
      // axios.get('http://localhost:3001/api/notes').then(response =>{
      //   setNotes(response.data)
      // })
      personService.getAll().then(data => {
        setPersons(data)
      })
    }
    useEffect(() => {
      personService.getAll().then(data => {
        setPersons(data)
      })
    }, [])
    const addName = (event) => {
    event.preventDefault()
    // Check if the new name already exists in the phonebook
    if(persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        const updatedPerson = {
          ...personToUpdate,
          number: newNumber
        }
        personService.update(personToUpdate.id, updatedPerson 
        )
        .then(response => {
          setPersons(persons.map(person => person.id !== response.id ? person : response))
          setSuccessMessage(`Updated ${newName} with new ${newNumber}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('Error updating person:', error)
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.name !== newName))
        })
      }
      setNewName('')
      setNewNumber('')
      return
    }
    // If the name does not exist, create a new person
    if(newName.trim() === '' || newNumber.trim() === '') {
      alert('Please enter both name and number')
      return
    }
    // Create a new person object and add it to the phonebook
    const newPerson = {
      name: newName,
      number: newNumber,
      id : persons.length +1
    }
    personService.create(newPerson)
    .then(response =>{
      setPersons(persons.concat(response))
      setSuccessMessage(`Added ${newName} with number ${newNumber}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      // Clear the input fields after adding the person
      setNewName('')
      setNewNumber('')
    })
    alert(`${newName} has been added to phonebook`)
    setNewName('')
    setNewNumber('')
  }
  const deletePerson = (id) =>{
      personService.getById(id)
      .then(response => {
        if (window.confirm(`Delete ${response.name}?`)) {
           personService.remove(id)
          .then(()=>{
          setPersons(persons.filter(person => person.id !== id))
          alert('Person deleted successfully')
        })
        } else {
          throw new Error('Deletion cancelled')
        }
      })
      .catch(error => {
        console.error('Error deleting person:', error)
      })

       

      
  
  }
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <h2>PhoneBook</h2>
      <PhoneError error={errorMessage} success = {successMessage}/>
        <Filter filter={filter} handleChangeFilter={handleChangeFilter}/>
      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <ShowPersons persons={personsToShow} deletePerson={deletePerson}/>
      <ShowNotes notes={notes} />
    </div>
  )

}
export default App

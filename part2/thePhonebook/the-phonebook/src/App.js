import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
 const [persons, setPersons] = useState([])
 const [newName, setNewName] = useState('')
 const [newNumber, setNewNumber] = useState('')
 const [newSearch, setNewSearch] = useState('')
 const [successMessage, setSuccessMessage] = useState(null)
 const [failureMessage, setFailureMessage] = useState(null)

 const hook = () => {
    personService.getAll()
        .then(initialPersons => {
            setPersons(initialPersons)
        })
 }
 useEffect(hook, [])

 const handleNameChange = (event) => {
  setNewName(event.target.value)
 }

 const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
 }

 const handleSearchChange = (event) => {
  setNewSearch(event.target.value)
 }

 const handleDeletePerson = (event) => {
    const id = event.target.value
    const [person] = persons.filter(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ? `)) {
        personService.deletePerson(id)
        setPersons(persons.filter(p => p.id !== id))
    }
}

 const addPerson = (event) => {
  event.preventDefault()
//   const person =
//   persons.find(person => person.name === newName) || ''
//   console.log(person)
//   if (person.name === newName) {
//       const message = `${newName} is already added to phonebook, replace the old number with a new one?`
//    if (window.confirm(message)) {
//         const personObject = { 
//             name: newName, 
//             number: newNumber
//         }
//         personService.update(person.id, personObject)
//             .then( returnedPerson => {
//                 setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
//                 setSuccessMessage(
//                     `${newName}'s number was changed`
//                   )
//                   setTimeout(() => {
//                     setSuccessMessage(null)
//                   }, 5000)
//             }).catch(error => {
//                 setFailureMessage(
//                     `Information of ${personObject.name} has already been removed from the server`
//                 )
//                 setPersons(persons.filter(p => p.name !== personObject.name))
//                 setTimeout(() => {
//                     setFailureMessage(null)
//                   }, 5000)
//             })
//    }
//   } else {
   const personObject = {
    name: newName,
    number: newNumber,
   }
   personService.create(personObject)
    .then( response => {
        setPersons(persons.concat(response.data))
        setSuccessMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
    })
    .catch(error => {
        setFailureMessage(
            error.response.data.error
        )
        setTimeout(() => {
            setFailureMessage(null)
        }, 5000)

    })

  
  setNewName('')
  setNewNumber('')
 }

 return (
  <div>
   <h1>Phonebook</h1>
   <Notification successMessage={successMessage} failureMessage={failureMessage}/>
   <Filter value={newSearch} onChange={handleSearchChange}/>
   <h2>Add new</h2>
   <PersonForm 
    onSubmit={addPerson} 
    valueName={newName} 
    onChangeName={handleNameChange} 
    valueNumber={newNumber} 
    onChangeNumber={handleNumberChange}
   />
   <h2>Numbers</h2>
   <Persons 
    persons={persons} 
    newSearch={newSearch} 
    handleDeletePerson={handleDeletePerson}
   />
  </div>
 )
}

export default App

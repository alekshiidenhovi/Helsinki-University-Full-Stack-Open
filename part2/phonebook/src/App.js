import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Person from "./components/Person"
import personService from "./services/persons"

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
    .get()
    .then(setPersons)
  }, [])

  const addName = event => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        // Update name
        const oldPerson = persons.find(person => person.name === newName)
        personService
        .update(oldPerson.id, nameObject)
        .then(returnedPerson => setPersons(persons.map(person => {
          return person.name === newName ? returnedPerson : person
        })))
      }
    } else {
      // Create a new name
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    }
    // Reset name and number fields
    setNewName("")
    setNewNumber("")
  }

  const removeName = id => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
    }
  }

  const personsToShow = input => persons.filter(person => person.name.toLowerCase().startsWith(input.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} updateFilter={(event) => setNewFilter(event.target.value)} />
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/></div>
        <div>number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {personsToShow(newFilter).map(person => <Person key={person.id} person={person} removeName={removeName} />)}
    </div>
  )
}

export default App
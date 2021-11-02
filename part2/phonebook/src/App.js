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
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
    }
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
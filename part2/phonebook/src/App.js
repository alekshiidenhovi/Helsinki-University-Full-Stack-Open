import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then((response) => {
      setPersons(response.data)
    })
  }, [])

  // Functions that handle the state updates
  const updateName = (event) => setNewName(event.target.value)
  const updateNumber = (event) => setNewNumber(event.target.value)
  const updateFilter = (event) => setNewFilter(event.target.value)

  const personsToShow = (input) => persons.filter(person => person.name.toLowerCase().startsWith(input))

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} updateFilter={updateFilter} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} updateName={updateName} newNumber={newNumber} updateNumber={updateNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} filter={newFilter} />
    </div>
  )
}

export default App
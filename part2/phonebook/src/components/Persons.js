import React from "react"

const Persons = ({ persons, filter }) => {
  return (
    <div>
      {persons(filter).map(person => <p key={person.id}>{person.name}</p>)}
    </div>
  )
}

export default Persons
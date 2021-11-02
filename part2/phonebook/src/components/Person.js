import React from "react"

const Person = ({ person, removeName }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
      <button onClick={() => removeName(person.id)}>delete</button>
    </div>
  )
}

export default Person
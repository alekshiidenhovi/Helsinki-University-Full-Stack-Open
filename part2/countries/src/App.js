import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './components/Display'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      console.log(response);
      setCountries(response.data)
    })
  }, []) 

  const updateFilter = event => setFilter(event.target.value)

  return (
    <div>
      find countries <input value={filter} onChange={updateFilter} />
      <Display filter={filter} countries={countries} />
    </div>
  )

}

export default App;

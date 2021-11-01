import React, { useState } from 'react'
import Button from './Button'
import Info from './Info'

const Display = ({ filter, countries }) => {
  const [displayCountry, setDisplayCountry] = useState(false)

  // Add index for the countries
  countries.forEach((obj, i) => obj.index = i)

  const filtCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  const len = filtCountries.length
  
  if (!filter) { // no filter
    return <p>Find countries by name</p>
  } else if (len > 10) { 
    return <p>Too many matches, specify another filter</p>
  } else if (len > 1 && !displayCountry) {
    return filtCountries.map(country => {
      return (
        <div key={country.index}>
          <p>{country.name.common}</p>
          <Button text="show" onClick={() => setDisplayCountry(country)} />
        </div>
      )
    })
  } else if (displayCountry) {
    return (
      <div>
        <Info country={displayCountry} />
        <Button text="show all" onClick={() => setDisplayCountry(false)} />
      </div>
    ) 
  } else if (len === 1) { // display information for the country
    return <Info country={filtCountries[0]} />
  } else {
    return <p>No country found</p>
  }
}

export default Display
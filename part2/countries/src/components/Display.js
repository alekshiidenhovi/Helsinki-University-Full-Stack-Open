import React from 'react'

const Display = ({ filter, countries }) => {
  // Add index for the countries
  countries.forEach((obj, i) => obj.index = i)

  const filtCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  const len = filtCountries.length
  if (!filter) { // no filter
    return <p>Find countries by name</p>
  } else if (len > 10) { 
    return <p>Too many matches, specify another filter</p>
  } else if (len > 1) {
    return filtCountries.map(country => <p key={country.index}>{country.name.common}</p>)
  } else if (len === 1) { // display information for the country
    const country = filtCountries[0]
    const languages = Object.keys(country.languages).map(key => country.languages[key])

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Land area: {country.area} km<sup>2</sup></p>
        <h2>Languages</h2>
        <ul>
          {languages.map((lang, i) => <li key={i}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt="flag" />
      </div>
    )
  } else {
    return <p>No country found</p>
  }
}

export default Display
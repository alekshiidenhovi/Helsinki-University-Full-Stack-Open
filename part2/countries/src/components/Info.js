import React from 'react'
import Weather from './Weather'

const Info = props => {
  const country = props.country
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
      <Weather country={country} />
    </div>
  )
}

export default Info
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({})
  const capital = country.capital[0]

  useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
    .then(response => setWeather(response.data.current))
    .catch(error => console.log("Error happened"))
  }, [country, capital])

  return (
    <div>
      <h2>Weather in {capital} </h2>
      <p><strong>temperature:</strong> {weather.temperature} Celsius</p>
      <img src={weather.weather_icons} alt="icon" />
      <p><strong>wind:</strong> {weather.wind_speed} km/h direction {weather.wind_dir}</p>
    </div>
  )
}

export default Weather;
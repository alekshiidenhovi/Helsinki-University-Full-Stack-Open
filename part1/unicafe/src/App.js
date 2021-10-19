import React, { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ text, stat, addPercent = false }) => {
  let percent = ""
  if (addPercent) percent = " %"
  return <p>{text} {stat}{percent}</p>
} 

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const avg = (good - bad) / all
  const positive = good / all

  return (

    <div>
      <div>
        <h1>give feedback</h1>
      </div>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
      </div>
      <div>
        <Statistics text="good" stat={good} />
        <Statistics text="neutral" stat={neutral} />
        <Statistics text="bad" stat={bad} />
        <Statistics text="all" stat={all} />
        <Statistics text="average" stat={avg} />
        <Statistics text="positive" stat={100*positive} addPercent={true} />
      </div>
    </div>
  )
}

export default App
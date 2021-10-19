import React, { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ text, stat }) => <p>{text} {stat}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
        <Statistic text="good" stat={good} />
        <Statistic text="neutral" stat={neutral} />
        <Statistic text="bad" stat={bad} />
      </div>
    </div>
  )
}

export default App
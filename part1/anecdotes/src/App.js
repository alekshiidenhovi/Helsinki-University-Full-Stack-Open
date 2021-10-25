import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  // Random number generator
  const n = anecdotes.length
  const rand = () => Math.trunc(Math.random() * n)

  // State and state functions
  const [selected, setSelected] = useState(rand())
  const [votes, setVotes] = useState(Array(n).fill(0))

  // Helper function to handle voting
  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes
      <div>
        <Button handleClick={() => handleVote()} text="vote" />
        <Button handleClick={() => setSelected(rand())} text="next anecdote" />
      </div>
    </div>
  )
}

export default App
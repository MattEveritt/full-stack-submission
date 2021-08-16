import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0,0])

  const selectRandom = () => {
      const min = Math.ceil(0);
      const max = Math.floor(6);
      setSelected(Math.floor(Math.random() * (max - min + 1) + min))
  }

  const votes = () => {
    const copy = { ...points }
    copy[selected] += 1
    setPoints(copy)
  }

  const mostVotes = () => {
    let max = points[0];
    let maxIndex = 0;
    for (let i = 1; i < 7; i++) {
        if (points[i] > max) {
            maxIndex = i;
            max = points[i];
        }
    }
    return maxIndex;
}

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={votes}>
        vote
      </button>
      <button onClick={selectRandom} >
        next anecdote
      </button>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[mostVotes()]}</p>
      <p>has {points[mostVotes()]} votes</p>
    </div>
  )
}

export default App

import React, { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if( all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine statistic={good} text='good'/>
            <StatisticLine statistic={neutral} text='neutral'/>
            <StatisticLine statistic={bad} text='bad'/>
            <StatisticLine statistic={good + neutral + bad} text='all'/>
            <StatisticLine statistic={(good/(all))-(bad/(all)) || 0} text='average'/>
            <StatisticLine statistic={good/(all)*100 || 0} text='positive' symbol='%'/>
          </tbody>
        </table>
      </div>
    )
  }
}

const StatisticLine = ({ statistic, text, symbol }) => <tr><td>{text}</td><td>{statistic} {symbol}</td></tr>

const Button = ({ handleClick, text }) => {
  return (
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App

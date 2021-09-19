import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    console.log(store.getState())
    store.dispatch({
      type: 'GOOD',
    })
  }
  const ok = () => {
    console.log(store.getState())
    store.dispatch({
      type: 'OK',
    })
  }
  const bad = () => {
    console.log(store.getState())
    store.dispatch({
      type: 'BAD',
    })
  }
  const reset = () => {
    console.log(store.getState())
    store.dispatch({
      type: 'ZERO',
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
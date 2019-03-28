import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({text}) => {
  return (
    <div><h2>{text}</h2></div>
  );
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({text, value}) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  );
}

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral;
  const avg = ((good * 1) + (neutral * 0) + (bad * -1)) / 3;
  const positivePr = total === 0 ? 0 : (good / total * 100).toFixed(2);
  
  return (
    <div>
      {total === 0 
       ? <p>Ei yhtään palautetta annettu</p>
       : 
        <table>
          <tbody>
            <tr><Display text='hyvä' value={good} /></tr>
            <tr><Display text='neutraali' value={neutral} /></tr>
            <tr><Display text='huono' value={bad} /></tr>
            <tr><Display text='yhteensä' value={total} /></tr>
            <tr><Display text='keskiarvo' value={avg} /></tr>
            <tr><Display text='positiivisia' value={`${positivePr} %`} /></tr>
          </tbody>
        </table>
       }
    </div>
  );  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Heading text='anna palautetta' />
      <Button text='hyvä' handleClick={() => setGood(good + 1)} />
      <Button text='neutraali' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='huono' handleClick={() => setBad(bad + 1)} />
      
      <Heading text='statistiikka' />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
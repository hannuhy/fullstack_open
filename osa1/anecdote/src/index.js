import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({anecdote, votes}) => {
  return (
    <>
      {anecdote}
      <div>
        <p>has {votes} votes</p>
      </div>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getRandom = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

  const vote = selected => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }
  
  const maxVotes = Math.max(...votes);
  const maxIndex = votes.findIndex(vote => vote === maxVotes);

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Display anecdote={props.anecdotes[selected]} votes={votes[selected]} />

      <div>
        <Button text="next anectdote" handleClick={() => setSelected(getRandom(0, anecdotes.length - 1))}/>
        <Button text="vote" handleClick={() => vote(selected)}/>
      </div>

      <h2>Anecdote with most votes</h2>
      <Display anecdote={props.anecdotes[maxIndex]} votes={votes[maxIndex]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
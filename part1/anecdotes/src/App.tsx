import { useState } from "react";

function getRandomAnecdote(anecdotes: string[]): number {
  return Math.floor(Math.random() * anecdotes.length);
}
const handleVote = ({
  selected,
  votes,
  setVotes,
}: {
  selected: number;
  votes: number[];
  setVotes: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const newVotes = [...votes];
  newVotes[selected] += 1;
  setVotes(newVotes);
};

function App() {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining ten percent accounts for the other 90 percent.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an overall architecture is like building a house on the sand.",
    "Simplicity is the soul of efficiency.",
  ];
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(getRandomAnecdote(anecdotes));
  const maxVotes = Math.max(...votes); // Find the maximum number of votes
  const maxVotesIndex = votes.indexOf(maxVotes); // Find the index of the anecdote with the maximum votes
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <button onClick={() => handleVote({ selected, votes, setVotes })}>
        vote
      </button>
      <button onClick={() => setSelected(getRandomAnecdote(anecdotes))}>
        next anecdote
      </button>

      <h2>Anecdote with most votes</h2>
      <p>
        {anecdotes[maxVotesIndex]}. has {maxVotes} votes
      </p>
    </div>
  );
}
export default App;

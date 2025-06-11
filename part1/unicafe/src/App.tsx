import { useInsertionEffect, useState } from "react";
type ButtonProps = {
  onClick: () => void;
  text: string;
};
const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr>
            <th>Good</th>
            <td>{good}</td>
          </tr>
          <tr>
            <th>neutral</th>
            <td>{neutral}</td>
          </tr>
          <tr>
            <th>bad</th>
            <td>{bad}</td>
          </tr>
          <tr>
            <th>all</th>
            <td>{bad + good + neutral}</td>
          </tr>
          <tr>
            <th>average</th>
            <td>{(good - bad) / (bad + good + neutral)}</td>
          </tr>
          <tr>
            <th>positive</th>
            <td>{(good / (bad + good + neutral)) * 100} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Button = (props: ButtonProps) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;

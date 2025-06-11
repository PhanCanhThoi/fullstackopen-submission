import { useInsertionEffect, useState } from "react";
type ButtonProps = {
  onClick: () => void;
  text: string;
};

const Button = (props: ButtonProps) => (
  <button onClick={props.onClick}>{props.text}</button>
);

const Display = ({ counter }: { counter: number }) => <div>{counter}</div>;

type HistoryProps = {
  allClicks: String[];
};

//History
const History = (props: HistoryProps) => {
  if (props.allClicks.length === 0) {
    return <div>The app is used by pressing the buttons</div>;
  }
  return <div>button press history : {props.allClicks.join("")}</div>;
};

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue: number) => () => {
    console.log("valur now", newValue);
    setValue(newValue);
  };
  const [counter, setCounter] = useState(0);
  const [right, setRight] = useState(0);
  const [left, setLeft] = useState(0);
  const [clicks, setClicks] = useState({ left: 0, right: 0 });
  const [allClicks, setAll] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    const updateLeft = left + 1;
    setLeft(updateLeft);
    setAll(allClicks.concat("L"));
    setTotal(updateLeft + right);
  };
  const handleRightClick = () => {
    const updateRight = right + 1;
    setRight(right + 1);
    setAll(allClicks.concat("R"));
    setTotal(left + updateRight);
  };
  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const zero = () => setCounter(0);
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a conponent",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <div>
        <Header course={course.name} />
        <Content
          part1={course.parts[0]}
          part2={course.parts[1]}
          part3={course.parts[2]}
        />
        <Total
          part1={course.parts[0]}
          part2={course.parts[1]}
          part3={course.parts[2]}
        />
      </div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={decreaseByOne} text="minus" />
      <Button onClick={zero} text="zero" />
      <div>
        {left}
        <button onClick={handleLeftClick}>Left</button>
        <button onClick={handleRightClick}>Right</button>
        {right}
        <p>total {total}</p>
        <History allClicks={allClicks} />
      </div>
      <div>
        {value}
        <Button onClick={setToValue(1000)} text="thousand" />
        <Button onClick={setToValue(0)} text="reset" />
        <Button onClick={setToValue(value + 1)} text="+1" />
      </div>
    </div>
  );
};

//Header
type HeaderProps = {
  course: string;
};

function Header({ course }: HeaderProps) {
  return <h1>{course}</h1>;
}

//content
type Part = {
  name: string;
  exercises: number;
};

type ContentProps = {
  part1: Part;
  part2: Part;
  part3: Part;
};
function Part({ name, exercises }: Part) {
  return (
    <p>
      {name} {exercises}
    </p>
  );
}
function Content({ part1, part2, part3 }: ContentProps) {
  return (
    <div>
      <p>
        {part1.name} {part1.exercises}
      </p>
      <p>
        {part2.name} {part2.exercises}
      </p>
      <p>
        {part3.name} {part3.exercises}
      </p>
    </div>
  );
}

//Total
type TotalProps = {
  part1: Part;
  part2: Part;
  part3: Part;
};

function Total({ part1, part2, part3 }: TotalProps) {
  const total = part1.exercises + part2.exercises + part3.exercises;
  return <p>tổng số bài tập là {total}</p>;
}

export default App;

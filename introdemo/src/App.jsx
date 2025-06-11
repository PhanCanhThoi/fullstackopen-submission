const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}
const Footer = () => {
  return (
    <div>
      Greetings app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}
const App = () =>{
  const friends = [
    'Peter' , ' Mays'
  ]
  return (
    <div>
      <p>{friends[0]}</p>
    </div>
  )
}
export default App;
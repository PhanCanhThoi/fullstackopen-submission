import App from "../App";
const ShowPersons = ({ persons,deletePerson }) => {
  return (
    <div>
      <table>
        <tbody>
          {persons.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button onClick={() => deletePerson(person.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>    
  )
}
export default ShowPersons;
const PersonForm = ({addName,newName,handleChangeName,newNumber,handleChangeNumber}) =>{
    return (
        <form onSubmit={addName}>
        <div>
          <div>name : <input value={newName} onChange={handleChangeName}/></div>
         <div > number : <input value={newNumber} onChange={handleChangeNumber}/></div>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}
export default PersonForm
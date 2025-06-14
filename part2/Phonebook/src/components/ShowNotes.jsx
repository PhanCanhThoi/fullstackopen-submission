const ShowNotes = ( props ) => {
    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {props.notes.map(note => (
                    <li key={note.id}>
                        {note.content} <strong>{note.important ? 'Important' : ''}</strong>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default ShowNotes
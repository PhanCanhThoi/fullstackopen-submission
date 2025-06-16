type NoteType = {
  id: number;
  content: string;
  important: boolean;
};
const Note = ({
  note,
  toggleImportance,
}: {
  note: NoteType;
  toggleImportance: () => void;
}) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}> {label}</button>
    </li>
  );
};
export default Note;

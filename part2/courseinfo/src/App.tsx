import Note from "./components/Note";
import { useEffect } from "react";
import Course from "./components/Course";
import React, { useState } from "react";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
type NoteType = {
  id: number;
  content: string;
  important: boolean;
};
function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
  const [newNote, setNewNote] = useState<string>("a new note...");
  const [showAll, setShowAll] = useState<boolean>(true);
  const [error, setError] = useState<string | null>("some error happened");
  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5, // Randomly set importance
      id: notes.length + 1, // Simple ID generation
    };
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote(""); // Clear the input field after adding the note
    });
  };
  const noteToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);
  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  const toggleImportanceOf = (id: number) => {
    const note = notes.find((n) => n.id === id);
    if (!note) {
      return;
    }
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
      })
      .catch((error) => {
        setError(`note '${note.content}' was already removed from server`);
        setTimeout(() => {
          setError(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Courses</h1>
      {courses.map((course) => {
        return <Course key={course.id} course={course} />;
      })}
      <div>
        <h1>Notes</h1>
        <Notification message={error} />
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? "important" : "all"}
          </button>
        </div>
        <ul>
          {noteToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
      </div>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  );
}

export default App;

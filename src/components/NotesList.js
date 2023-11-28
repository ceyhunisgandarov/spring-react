import { useEffect, useState } from "react";
import NotesService from "../services/NotesService";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    NotesService.getAll()
      .then((response) => {
        console.log("printing response", response.data);
        setNotes(response.data);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }, []);

  return (
    <div className="main-content">
      <h1>List of Notes</h1>
      <div className="notes-list mt4">
        {notes &&
          notes.map((note) => (
            <div className="notes-preview mt-3"  key={note.id}>
              <Link to={`/notes/${note.id}`}>
                <h5 className="primary-color text-capitalize">{note.title}</h5>
                <Moment fromNow className="font-italic">{note.updatedAt}</Moment>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NotesList;

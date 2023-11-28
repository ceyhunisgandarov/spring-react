import { useEffect, useState } from "react";
import NotesService from "../services/NotesService";
import { useNavigate, useParams } from "react-router-dom";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("programming");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      NotesService.getOnce(id)
        .then((note) => {
          setTitle(note.data.title);
          setBody(note.data.body);
          setCategory(note.data.category);
        })
        .catch((error) => {
          console.log("some went wrong", error);
        });
    }
  }, []);

  const saveNote = (e) => {
    e.preventDefault();
    const note = { title, body, category, id };
    if (id) {
      NotesService.update(note)
        .then((response) => {
          console.log("Note updated successfully", response.data);
          navigate(`/notes/${id}`);
        })
        .catch((error) => {
          console.log("some went wrong", error);
        });
    } else {
      NotesService.create(note)
        .then((response) => {
          console.log("Note saved successfully", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.log("some went wrong", error);
        }); 
    }
  };

  return (
    <div className="create">
      <div className="text-center">
      <h5>{id ? "Update a note" : "Add a new note"}</h5>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="title">
            Note Title : <sup>*</sup>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">
            Note Body : <sup>*</sup>
          </label>
          <textarea
            className="form-control"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="title">
            Select Category : <sup>*</sup>
          </label>
          <select
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="programming">Programming</option>
            <option value="vocation">Vocation</option>
            <option value="learning">Learning</option>
            <option value="meeting">Meeting</option>
          </select>
        </div>
        <div className="text-center">
          <button onClick={(e) => saveNote(e)}>{id ? "Update Note" : "Add Note"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;



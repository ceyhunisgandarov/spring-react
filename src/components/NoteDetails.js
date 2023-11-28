import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {confirmAlert} from "react-confirm-alert"
import NotesService from "../services/NotesService";
import Moment from "react-moment";

const NoteDetails = () => {
  const { id } = useParams();
  const [currentNote, setCurrentNote] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    NotesService.getOnce(id)
      .then((note) => {
        console.log("printing response", note.note);
        setCurrentNote(note.data);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }, []);

  const handleDelete = () => {
    NotesService.remove(id)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };

  const handleEdit = () => {
    navigate(`/notes/edit/${id}`);
  };



  const submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(), 
          className: "ml-3"
        },
        {
          label: "No",
          className: "ml-3"
          //onClick: () => alert('Click No')
        },
      ],
      overlayClassName: "overlay-custom-class-name"
    });
  };

  return (
    <div className="note-details main-content">
      <article>
        <h5 className="text-capitalize primary-color">{currentNote.title}</h5>
        <div className="mb-3 font-italic metadata">
          <Moment fromNow>{currentNote.updatedAt}</Moment>
          <span className="text-capitalize">/{currentNote.category}</span>
        </div>
        <div className="mb-3">{currentNote.body}</div>
      </article>
      <button onClick={handleEdit}>EDIT</button>
      <button onClick={submit} className="ml-3">
        DELETE
      </button>
    </div>
  );
};

export default NoteDetails;

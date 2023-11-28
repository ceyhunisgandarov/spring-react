import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/style.css";
import "./App.css";
import NotesList from "./components/NotesList";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import AddNote from "./components/AddNote";
import NoteDetails from "./components/NoteDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route exact path="/" Component={NotesList} />
            <Route exact path="/add" Component={AddNote} />
            <Route exact path="/notes/edit/:id" Component={AddNote} />
            <Route exact path="/notes/:id" Component={NoteDetails} />
            <Route path="*" Component={NotFound} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

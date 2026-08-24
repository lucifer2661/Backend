import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);


function fetchNotes(){

axios
      .get("https://backend-c50p.onrender.com/api/notes")
      .then((res) => {
        console.log(res.data);
        setNotes(res.data.notes);
      })
      .catch((err) => {
        console.error(err);
      });


}

function handleSubmit(e) {
  e.preventDefault();

  const { title, description } = e.target.elements;

  console.log(title.value, description.value);

  axios
    .post("https://backend-c50p.onrender.com/api/notes", {
      title: title.value,
      description: description.value,
    })
    .then((res) => {
      console.log(res.data);
      fetchNotes();
      e.target.reset();
    })
    .catch((err) => {
      console.error(err);
    });
}


function handleDeleteNote(noteId){
console.log(noteId);
axios.delete("https://backend-c50p.onrender.com/api/notes/"+noteId)

.then(res=>{
  console.log(res.data)
  fetchNotes()
})

}

function handleEditNote(id,oldDescription){

  const newDescription=prompt(
    "enter new Description",
    oldDescription
  );
  if(!newDescription){
    return;
  }
 axios
    .patch("https://backend-c50p.onrender.com/api/notes/" + id, {
      description: newDescription
    })
    .then((res) => {
      console.log(res.data);
      fetchNotes();
    })
    .catch((err) => {
      console.error(err);
    });


}






  useEffect(() => {
    fetchNotes()
  }, []);

  return (
    <>
    <form className="Note-create-form" onSubmit={handleSubmit}>
  <input name="title" type="text" placeholder="Enter title" />
  <input name="description" type="text" placeholder="Enter Description" />
  <button type="submit">Create Note</button>
</form>
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>

            <button onClick={()=>handleEditNote(note._id,note.description)}>edit Note</button>
            <button onClick={()=>{handleDeleteNote(note._id)}}>delete Note</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
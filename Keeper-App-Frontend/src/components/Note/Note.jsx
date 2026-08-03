import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {

  function handleClick(event){
    props.deleteItem(props.id)
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick} className="delete-button"><DeleteIcon className="delete-button" /></button>
    </div>
  );
}

export default Note;

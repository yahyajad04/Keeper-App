import React,{useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  const [note, setNote] = useState({title:"", content:""});
  const [expand, setExpand] = useState(false);
  function handleChange(event){
    var {value,name} = event.target;
    setNote(prev => {
      return {
        ...prev,
        [name] : value
      }
    });
  }

  function handleClick(event){
    props.addItem(note);
    setNote({title:"", content:""});
    event.preventDefault();
    setExpand(false);
  }

  function handleExpand(){
    setExpand(true);
  }

  return (
    <div>
      <form className="create-note">
        {expand && <input onChange={handleChange} name="title" placeholder="Title" value={note.title} />}
        <textarea onClick={handleExpand} name="content" placeholder="Take a note..." rows={expand ? "3" : "1"} onChange={handleChange} value={note.content}/>
      <Zoom in={expand}>
        <Fab onClick={handleClick}><AddIcon /></Fab>
      </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;

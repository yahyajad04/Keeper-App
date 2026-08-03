import React,{useState, useEffect} from "react";
import Note from "../components/Note/Note";
import CreateArea from "../components/Note/CreateArea";
import getNotes,{createNote,deleteNote} from "../api/notesApi";
import { useNavigate } from "react-router-dom";

function Home(props){
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    async function fetchNotes() {
        try{
            const data = await getNotes();
            setNotes(data);
        }catch(err){
            console.log(err.stack);
            navigate("/error", {
                state: {
                    message : err.message
                },
                replace: true
            });
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    async function addItem(note){
        try{
            await createNote(note);
            await fetchNotes();
        }catch(err){
            console.log(err.stack);
            navigate("/error", {
                state: {
                    message : err.message
                },
                replace: true
            });
        }
    }

    async function deleteItem(id){
        try{
            await deleteNote(id);
            setNotes(prev => {
            return prev.filter((n) => n.id !== id)});
        }catch(err){
            console.log(err.stack);
            navigate("/error", {
                state: {
                    message : err.message
                },
                replace: true
            });
        }
    }

    return (
        <div>
            <CreateArea addItem={addItem} />
            {notes.map((n) => {
                return <Note key={n.id} id={n.id} title={n.title} content={n.content} deleteItem={deleteItem} />
            })}
        </div>
    );
}

export default Home;
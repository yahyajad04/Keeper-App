 
 async function getNotes() {
        const response = await fetch("http://localhost:3000/notes", {
            credentials: "include"
        });
        if(!response.ok)
            throw new Error("Failed to Fetch Notes");
        const data = await response.json();

        return data;
    }

export async function createNote(note){
    const response = await fetch("http://localhost:3000/notes", {
    method: "POST",
    credentials: "include",
        headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        ...note
    })
    });

    if(!response.ok)
        throw new Error("Failed to create note");

    return await response.json();
}

export async function deleteNote(id){
 const response = await fetch(`http://localhost:3000/notes/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        });

    if(!response.ok)
        throw new Error("Failed to create note");

    return await response;
}

export default getNotes;
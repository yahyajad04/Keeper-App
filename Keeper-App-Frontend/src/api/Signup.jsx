import React from "react";

async function Signup(name,email,password){
        const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        credentials: "include",

        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });

    if(!response.ok)
        return {error : "SignUp Error Occured"};

    const data = await response.json();
    return data;
}

export default Signup;
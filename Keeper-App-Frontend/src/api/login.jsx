import React from "react";

async function Login(email,password){
        const response = await fetch("http://localhost:3000/login", {
        method: "POST",

        credentials: "include",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })
    });

    if(!response.ok)
        return {error : "Fetch Error Occured"};

    const data = await response.json();
    return data;
}

export default Login;
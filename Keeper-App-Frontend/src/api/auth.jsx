import React from "react";

async function getCurrentUser(){
    const response = await fetch("http://localhost:3000/me", {
        credentials: "include"
    });

    if(!response.ok){
        return null;
    }

    var data = await response.json();
    return data;
}

export async function logout(){
     const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include"
    });

    if(!response.ok){
        throw new Error(await response.json());
    }

    var data = await response.json();
    return data;
}

export default getCurrentUser;
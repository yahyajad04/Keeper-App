import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Index(){
    const {user, loading} = useAuth();

    if(loading)
        return(<div>...LOADING</div>)
    
    console.log(user);
    if(user)
        return <Navigate to="/Home" replace />;
    else
        return <Navigate to="/login" replace />;
    
}
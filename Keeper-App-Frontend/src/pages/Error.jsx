import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

function Error(){
    const location = useLocation();
    const error = location.state;
    const {user} = useAuth();

    return (
        <div>
            <h2>An Error Occured With you Request</h2>
            
            <p>{error?.message ?? "Unkown Error Source"}</p>
            <NavLink to={user? "/Home" : "/login"} replace>Back to Home Page</NavLink>
        </div>
    );
}

export default Error;
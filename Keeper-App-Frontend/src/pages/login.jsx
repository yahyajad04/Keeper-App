import React from "react";
import LoginInput from "../components/login/LoginInput";
import log from "../api/login";


function Login(props){
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 w-50 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <LoginInput login={log}/>
        </div>
    )
}

export default Login;
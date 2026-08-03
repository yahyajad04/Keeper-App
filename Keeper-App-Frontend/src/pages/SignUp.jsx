import React from "react";
import SignupInput from "../components/signup/SignupInput";
import Signup from "../api/Signup";

function SignUp(){
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 w-50 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <SignupInput signup={Signup} />
        </div>
    );
}

export default SignUp;
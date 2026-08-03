import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

function LoginInput(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const {setUser} = useAuth();

  function handleChange(event) {
    var { value, name } = event.target;

    if (name === "email") setEmail(value);
    else setPass(value);
  }

  async function handleClick(event) {
    event.preventDefault();
    var data = await props.login(email, pass, props.setUser);
    console.log(data.name, " ", data.email);
    if(!data.error){
      console.log("Navigating");
      setUser(data);
      navigate("/Home");  
    } else{
        throw data.error;
    }    
  }

  return (
        <main className="form-signin w-50 m-auto">
        <form>
            <h1 className="h3 mb-3 fw-bold fs-1 text-center">Sign In</h1>
            <div className="form-floating mb-1 mx-auto">
            <input
                onChange={handleChange}
                value={email}
                type="email"
                className="form-control"
                id="floatingInput"
                name="email"
                placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-4 mx-auto">
            <input
                onChange={handleChange}
                value={pass}
                type="password"
                className="form-control"
                id="floatingPassword"
                name="password"
                placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
            </div>
            <button
            onClick={handleClick}
            className="btn btn-dark d-block mx-auto"
            type="submit"
            >
            Sign in
            </button>
        </form>
        </main>
    
  );
}

export default LoginInput;

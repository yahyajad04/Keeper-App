import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupInput(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    var { value, name } = event.target;

    if (name === "email") setEmail(value);
    else if(name === "password") setPass(value);
    else setName(value);
  }

  async function handleClick(event) {
    event.preventDefault();
    var data = await props.signup(name,email,pass);
    if(!data.error){
        navigate("/login");  
    } else{
        throw data.error;
    }    
  }

  return (
        <main className="form-signin w-50 m-auto">
        <form>
            <h1 className="h3 mb-3 fw-bold fs-1 text-center">Sign Up</h1>
            <div className="form-floating mb-1 mx-auto">
            <input
                onChange={handleChange}
                value={name}
                type="name"
                className="form-control"
                id="floatingInput"
                name="name"
                placeholder="John"
            />
            <label htmlFor="floatingInput">Name</label>
            </div>
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
            Sign up
            </button>
        </form>
        </main>
    
  );
}

export default SignupInput;

import React from "react";
import {logout} from "../../api/auth";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export default function UserIcon(props){
  const navigate = useNavigate();
  const {setUser} = useAuth();

  async function handleClick(){
    try{
      var data = await logout();
      setUser(null);
      navigate("/login");
    }catch(err){
      console.log(err);
    }
  }
    return (
<div className="col-md-3 text-end">
  <div className="dropdown d-flex justify-content-end">
    <button
      className="btn btn-light d-flex align-items-center dropdown-toggle shadow-sm"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{backgroundColor:"#f5ba13", border: "none"}}
    >
      <img
        src="https://github.com/mdo.png"
        alt="Profile"
        width="38"
        height="38"
        className="rounded-circle me-2"
      />

      <span className="fw-semibold">{props.user.name}</span>
    </button>

    <ul className="dropdown-menu dropdown-menu-end shadow">
      <li>
        <h6 className="dropdown-header">
          Welcome back
        </h6>
      </li>

      <li>
        <span className="dropdown-item-text fw-semibold">
          {props.user.name}
        </span>
      </li>

      <li>
        <hr className="dropdown-divider" />
      </li>

      <li>
        <button className="dropdown-item text-danger" onClick={handleClick}>
          Sign out
        </button>
      </li>
    </ul>
  </div>
</div>
);
}
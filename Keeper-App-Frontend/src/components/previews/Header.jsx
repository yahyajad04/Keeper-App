import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import { NavLink, Outlet } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import UserIcon from "../previews/UserIcon";

function Header() {
  const {user} = useAuth();
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div className="col-md-3 mb-2 mb-md-0">
        <h1>
          <HighlightIcon />
          Keeper
        </h1>
      </div>
      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li></li>
        <li>
          <NavLink className="nav-link px-2 link-secondary" to="/Home">
            Home
          </NavLink>
        </li>
      </ul>
      {user ? 
        <UserIcon user={user}/>
      : <div className="col-md-3 text-end">
        <NavLink className="btn btn-dark me-2" to="/login">
          Login
        </NavLink>
        <NavLink className="btn btn-light me-2" to="/signup">
          Sign Up
        </NavLink>
      </div>}
      
    </header>
  );
}

export default Header;

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Outlet, useNavigate} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RootLayout(){
    return (
        <div>
            <Header />
            <main>
                <Outlet />  
            </main>
            <Footer />
        </div>
    );
}

export default RootLayout;
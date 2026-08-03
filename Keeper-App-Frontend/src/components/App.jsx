import React from "react";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login";
import RootLayout from "./previews/RootLayout";
import Error from "../pages/Error";
import SignUp from "../pages/SignUp";
import { useState, useEffect } from "react";
import getCurrentUser from "../api/auth";
import Index from "../pages/Index";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<Error />}>
        <Route index element={<Index />} />
        <Route path="Home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router = {router}/>
    </div>
  );
}

export default App;

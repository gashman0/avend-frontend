import { useEffect, useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LoggedInLayout from "./LoggedInLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" index element={<Home />} errorElement={""}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="login" element={<Login />} />

      <Route element={<LoggedInLayout />} errorElement={""}>
      </Route>
    </>
  ),
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
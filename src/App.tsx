import { useEffect, useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LoggedInLayout from "./LoggedInLayout";
import Home from "./pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" index element={<Home />} errorElement={""}/>

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
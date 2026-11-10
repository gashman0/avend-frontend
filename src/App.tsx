import { useEffect, useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LoggedInLayout from "./LoggedInLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" index errorElement={""}/>

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
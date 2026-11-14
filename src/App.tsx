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
import Dashboard from "./pages/Dashboard/Dashboard";
import Wallet from "./pages/Dashboard/Wallet";
import InvestmentPlans from "./pages/Dashboard/InvestmentPlans";
import Investments from "./pages/Dashboard/Investments";
import Transactions from "./pages/Dashboard/Transactions";
import Referrals from "./pages/Dashboard/Referrals";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" index element={<Home />} errorElement={""}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<LoggedInLayout />} errorElement={""}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/wallet" element={<Wallet />} />
        <Route path="/dashboard/plans" element={<InvestmentPlans /> } />
        <Route path="/dashboard/investments" element={<Investments /> } />
        <Route path="/dashboard/transactions" element={<Transactions /> } />
        <Route path="/dashboard/referrals" element={<Referrals /> } />
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
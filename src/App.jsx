import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/Signup';
import LoginPage from './pages/Login';
import RecruiterPage from './pages/RecruiterPage';
import JobDetailsPage from './pages/JobDetail';
import JobListingsPage from './pages/JobListings';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/signup"
          element={<SignUpPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/recruiter"
          element={<RecruiterPage />}
        />
        <Route
          path="/final_applicants"
          element={<JobDetailsPage />}
        />
        <Route
          path="/joblistings"
          element={<JobListingsPage />}
        />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

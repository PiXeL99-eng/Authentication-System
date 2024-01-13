import { useState } from 'react'
import { Home, Signup, Login } from './components';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        {/* <AuthContextProvider> */}
          <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route exact path="/" element={<Home />} />
          </Routes>
        {/* </AuthContextProvider> */}
      </Router>
    </>
  )
}

export default App

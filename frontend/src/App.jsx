// import { useState } from 'react'
// import { Home, Signup, Login } from './pages';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthProvider from "./provider/authProvider";
import Routes from "./routes";

function App() {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
  
}

export default App

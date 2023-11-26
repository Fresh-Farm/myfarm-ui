import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home/Home';
import ProjectDetails from './pages/Project/ProjectDetails';

function App({ pca }) {

  return (
    <>

      <Router>
        <Sidebar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/project" element={<ProjectDetails />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

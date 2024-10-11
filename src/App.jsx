import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PhotoGrid, PhotoDetails } from './component';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/photos" element={ <PhotoGrid/> } />
        <Route path="/photos/:id" element={ <PhotoDetails/> } />
      </Routes>
    </Router>
  );
}

export default App;

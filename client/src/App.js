import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Registration } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Registration } from './pages';
import {Home} from './pages';
import TeamsPageTemporary from './pages/TeamsPageTemporary';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="teams-page" element={<TeamsPageTemporary/>}/>
      </Routes>
    </Router>
  );
}

export default App;

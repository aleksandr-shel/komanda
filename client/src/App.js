import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Registration } from './pages';
import {Home} from './pages';
import TeamsPageTemporary from './pages/TeamsPageTemporary';
import ProjectsPageTemp from './pages/ProjectsPageTemp';
import {TasksPage} from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="teams-page" element={<TeamsPageTemporary/>}/>
        <Route path="projects-page" element={<ProjectsPageTemp/>}/>
        <Route path="tasks-page" element={<TasksPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

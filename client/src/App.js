import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Registration } from "./pages";
import { Home, TeamsPage, ProjectsPage, TasksPage} from "./pages";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="teams-page" element={<TeamsPage />} />
        <Route path="/:teamId/projects-page" element={<ProjectsPage />} />
        <Route path="/:teamId/:projectId/tasks-page" element={<TasksPage />} />
      </Routes>
    </Router>
  );
}

export default App;

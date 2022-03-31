import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, TeamsPage, ProjectsPage, TasksPage} from "./pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import io from "socket.io-client";

const socket = io.connect('https://komanda-app.herokuapp.com/');
// const socket = io.connect('/');

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="teams-page" element={<TeamsPage socket={socket} />} />
        <Route path="/:teamId/projects-page" element={<ProjectsPage  socket={socket} />} />
        <Route path="/:teamId/:projectId/tasks-page" element={<TasksPage socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;

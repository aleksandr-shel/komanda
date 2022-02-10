import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home/Home';
import reportWebVitals from './reportWebVitals';
import { ProjectsProvider } from './context/projects_context';

ReactDOM.render(
<<<<<<< HEAD
  <ProjectsProvider>
    <App />
  </ProjectsProvider>,
=======
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
>>>>>>> 9eb949978bf0db43023c2061f70e237e8c7a41ea
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

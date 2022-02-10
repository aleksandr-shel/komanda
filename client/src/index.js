import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home/Home';
import reportWebVitals from './reportWebVitals';
import { ProjectsProvider } from './context/projects_context';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <ProjectsProvider>
    <Auth0Provider
      domain="dev-8nhix7k3.us.auth0.com"
      clientId="qOHZS1OO4HyzYF5wFqIey6e5YTez8R76"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </ProjectsProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

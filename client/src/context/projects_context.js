import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/projects_reducer';
import { products_url as url } from '../utils/constants';
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PROJECTS_BEGIN,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  GET_SINGLE_PROJECT_BEGIN,
  GET_SINGLE_PROJECT_SUCCESS,
  GET_SINGLE_PROJECT_ERROR,
} from '../actions';

const initialState = {
  isSidebarOpen: false,
  projects_loading: false,
  projects_error: false,
  projects: [false],
  featured_projects: [],
  single_project_loading: false,
  single_project_error: false,
  single_project: {},
};

const ProjectsContext = React.createContext();

export const ProjectsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchProjects = async (url) => {
    dispatch({ type: GET_PROJECTS_BEGIN });
    try {
      const response = await axios.get(url);
      const projects = response.data;
      dispatch({ type: GET_PROJECTS_SUCCESS, payload: projects });
    } catch (error) {
      dispatch({ type: GET_PROJECTS_ERROR });
    }
  };

  const fetchSingleProject = async (url) => {
    dispatch({ type: GET_SINGLE_PROJECT_BEGIN });
    try {
      const response = await axios.get(url);
      const singleProject = response.data;
      dispatch({ type: GET_SINGLE_PROJECT_SUCCESS, payload: singleProject });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PROJECT_ERROR });
    }
  };

  useEffect(() => {
    fetchProjects(url);
  }, []);

  return (
    <ProjectsContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </ProjectsContext.Provider>
  );
};
// make sure use
export const useProjectsContext = () => {
  return useContext(ProjectsContext);
};

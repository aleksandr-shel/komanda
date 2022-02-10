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

const projects_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === GET_PROJECTS_BEGIN) {
    return { ...state, projects_loading: true };
  }
  if (action.type === GET_PROJECTS_SUCCESS) {
    const featured_projects = action.payload.filter(
      (project) => project.featured === true
    );
    return {
      ...state,
      projects_loading: false,
      projects: action.payload,
      featured_projects,
    };
  }
  if (action.type === GET_PROJECTS_ERROR) {
    return { ...state, projects_loading: false, projects_error: true };
  }
  if (action.type === GET_SINGLE_PROJECT_BEGIN) {
    return {
      ...state,
      single_project_loading: true,
      single_project_error: false,
    };
  }
  if (action.type === GET_SINGLE_PROJECT_SUCCESS) {
    return {
      ...state,
      single_project_loading: false,
      single_project: action.payload,
    };
  }
  if (action.type === GET_SINGLE_PROJECT_ERROR) {
    return {
      ...state,
      single_project_loading: false,
      single_project_error: true,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default projects_reducer;

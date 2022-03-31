import React from "react";
import { useState } from "react";
import '../assets/Projects.css'
import { useEffect } from "react";
import axios from 'axios';
//import crown from '../assets/images/crown.svg'
import { useAuth0 } from "@auth0/auth0-react";
import {Breadcrumb, CloseButton} from 'react-bootstrap';
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { CreateProjectForm, DeleteProjectForm } from "../components";

export default function ProjectsPage({socket}) {

    const { user } = useAuth0();
    const {teamId} = useParams();

    let { isAuthenticated, logout } = useAuth0();

    // const userId = isAuthenticated ? user?.sub.split('|')[1] : null;

    const [showCreateProjectForm, setShowCreateProjectForm] = useState(false);
    const [projectsList, setProjectsList] = useState([]);
    const [team, setTeam] = useState({});

    const [showDeleteProjectForm, setShowDeleteProject] = useState(false);
    const [projectIdToDelete, setProjectIdToDelete] = useState('');
    const [projectNameToDelete, setProjectNameToDelete] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (teamId !==null){
            socket.emit('joinProjectsPage', {teamId})
        }
        async function getTeamProjects() {
            if (teamId) {
                const result = await axios.get(`/api/projects/${teamId}`)
                setProjectsList(result.data);
                axios.get(`/api/teams/${teamId}`).then(result=>{
                    setTeam(result.data);
                })
                socket.emit('leaveTasksPageRooms', result.data)
            }
        }
        getTeamProjects();
    }, [])

    useEffect(()=>{
        socket.on('project-added', (project)=>{
            setProjectsList(projects => [...projects, project])
        })
        socket.on('project-deleted', ({projectId})=>{
            setProjectsList(projects=> projects.filter(project=>project._id !==projectId))
        })
    },[socket])

    useEffect(()=>{
        console.log('navigating');
        console.log(window.location)
    },[window.location])

    function selectProject(projectId){
        navigate(`/${teamId}/${projectId}/tasks-page`)
    }

    function deleteProject(e, projectId, projectName){
        e.stopPropagation();
        setShowDeleteProject(true);
        setProjectIdToDelete(projectId);
        setProjectNameToDelete(projectName);
    }

    if (isAuthenticated) {
        return (
        <>
            <div id='wrapperProjects'>
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to:'/'}}>Home</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to:'/teams-page'}}>Teams Page</Breadcrumb.Item>
                    <Breadcrumb.Item active>Projects Page</Breadcrumb.Item>
                </Breadcrumb>
                <div className="projectsProjects">
                    <h1>{team.teamName} Projects</h1>
                    <h5>Here is a list of projects created by {team.teamName}...</h5>
                    <div className="listofProjectsProjects">
                        <div className="addprojectProjects" onClick={()=>setShowCreateProjectForm(true)}>
                            <h1 className="plusSignProjects">+</h1>
                            <h2 className="addTextProjects"> Add New Project</h2>
                        </div>
                        {
                            projectsList.map((project, index)=>(
                                <div style={{position:'relative'}} key={index} onClick={()=>{selectProject(project._id)}} className="projectProjects">
                                    <div style={{position:'absolute', top:'2px', right:'2px'}} onClick={(e)=>{deleteProject(e, project._id, project.projectName)}}>
                                        <CloseButton />
                                    </div>
                                    <h2 className="projectNameProjects">{project.projectName}</h2>
                                    <br />
                                    <p className="detailsProjects">Number of Tasks: {project.tasks.length}</p>
                                    <br /><br /><br />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="sideBarProjects">
                    <img className="userpicProjects" src={user.picture} alt={user.name} />
                    <br/>
                    <h2 className="usernameProjects">{user.name.toUpperCase()}</h2>
                    <div className="buttonListProjects">
                        <button onClick={()=> { navigate('/teams-page') }}  className="createButtonProjects">Teams </button>
                        <button className="elseButtonProjects" onClick={() => { logout({  returnTo: window.location.origin})}}>Sign Out</button>
                    </div>
                </div>
            </div>
            <CreateProjectForm toShow={showCreateProjectForm} setToShow={setShowCreateProjectForm} teamId={teamId} setProjectsList={setProjectsList} socket={socket}/>
            <DeleteProjectForm toShow={showDeleteProjectForm} setToShow={setShowDeleteProject} projectName={projectNameToDelete} projectId={projectIdToDelete} teamId={teamId} setProjects={setProjectsList} socket={socket}/>
        </>
        )
    } else {
        return (
            <>
                <p>Please log in</p>
            </>
        )
    }
}
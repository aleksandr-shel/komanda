import React from "react";
import { useState } from "react";
import '../assets/Projects.css'
import { useEffect } from "react";
import axios from 'axios';
//import crown from '../assets/images/crown.svg'
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import {Breadcrumb} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { CreateProjectForm } from "../components";

export default function TeamsPage() {

    const { user } = useAuth0();
    const {teamId} = useParams();

    let { isAuthenticated } = useAuth0();

    const userId = isAuthenticated ? user?.sub.split('|')[1] : null;

    const [showCreateProjectForm, setShowCreateProjectForm] = useState(false);
    const [projectsList, setProjectsList] = useState([]);
    const [team, setTeam] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        async function getTeamProjects() {
            if (teamId) {
                const result = await axios.get(`/api/projects/${teamId}`)
                setProjectsList(result.data);
                axios.get(`/api/teams/${teamId}`).then(result=>{
                    setTeam(result.data);
                })
            }
        }
        getTeamProjects();
    }, [])

    function selectProject(projectId){
        navigate(`/${teamId}/${projectId}/tasks-page`)
    }

    if (isAuthenticated) {
        return (
        <>
            <div id='wrapper'>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/teams-page">Teams Page</Breadcrumb.Item>
                    <Breadcrumb.Item active>Projects Page</Breadcrumb.Item>
                </Breadcrumb>
                <div className="projects">
                    <h1>/{team.teamName}\ Projects</h1>
                    <h5>Here is a list of projects created by /Team Name\...</h5>
                    <div className="listofproject">
                        <div className="addProject" onClick={()=>setShowCreateProjectForm(true)}>
                            <h1 className="plusSign">+</h1>
                            <h2 className="addText"> Add New Project</h2>
                        </div>
                        {
                            projectsList.map((project, index)=>(
                                <div key={index} onClick={()=>{selectProject(project._id)}} className="project">
                                    <h2 className="projectName">{project.projectName}</h2>
                                    <br />
                                    <p>Number of Tasks: {project.tasks.length}</p>
                                    <br /><br /><br />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="sideBar">
                    <img className="userpic" src={user.picture} alt={user.name} />
                    <br/>
                    <h2 className="username">{user.name.toUpperCase()}</h2>
                    <div className="buttonList">
                        <button className="elseButton">Profile</button>
                        <button className="createButton">Teams </button>
                        <button className="elseButton">Sign Out</button>
                    </div>
                </div>
            </div>
            <CreateProjectForm toShow={showCreateProjectForm} setToShow={setShowCreateProjectForm} teamId={teamId} setProjectsList={setProjectsList}/>
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
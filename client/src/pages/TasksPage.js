import React from "react";
import { useState } from "react";
import '../assets/Tasks.css'
import { useEffect } from "react";
import axios from 'axios';
//import crown from '../assets/images/crown.svg'
import { useAuth0 } from "@auth0/auth0-react";
import ChangeTeamMembersForm from '../components/ChangeTeamMembersForm';
import { AiOutlineCrown } from "react-icons/ai";
import { useParams } from "react-router-dom";
import {Breadcrumb} from 'react-bootstrap';
import { CreateTaskForm } from "../components/CreateTaskForm";

export default function TasksPage() {

    const { user } = useAuth0();
    const {projectId, teamId} = useParams();

    let { isAuthenticated } = useAuth0();
    const [tasks, setTasks] = useState([]);
    const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);

    useEffect(()=>{
        async function getProjectTasks() {
            if (projectId){
                const result = await axios.get(`/api/tasks/project/${projectId}`);
                setTasks(result.data);
            }
        }
        getProjectTasks();
    },[])

    if (isAuthenticated) {
        return (
            <div>
                <div id='wrapper'>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/teams-page">Teams Page</Breadcrumb.Item>
                        <Breadcrumb.Item href={`/${teamId}/projects-page`}>Projects Page</Breadcrumb.Item>
                        <Breadcrumb.Item active>Tasks Page</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="teams">
                        <h1>//Project Name\\ Tasks:</h1>
                        <button className="addTaskButton" onClick={()=>setShowCreateTaskForm(true)}>+ Add Task</button>
                        <div className="listOfTasks">
                            <table>
                                <thead className="tasksListHeader"> 
                                    <tr > 
                                        <td><h5 style={{paddingRight: 380}}>Description</h5></td>
                                        <td><h5 style={{paddingRight: 80}}>Deadline</h5></td>
                                        <td><h5 style={{paddingRight: 80}}>Status</h5></td>
                                        <td><h5 style={{paddingRight: 32}}>Executors</h5></td>
                                    </tr>
                                </thead>
                                <tbody className="tasksListHeader"> 
                                    {
                                        tasks.map((task,index)=>{
                                            return (
                                                <tr > 
                                                    <td><h5 style={{paddingRight: 40}}>{task.description}</h5></td>
                                                    <td><h5 style={{paddingRight: 80}}>{task.deadline}</h5></td>
                                                    <td><h5 style={{paddingRight: 19, paddingLeft: 19, backgroundColor: "#FFCD1D"}}>{task.status}</h5></td>
                                                    <td><h5 style={{paddingRight: 31, paddingLeft: 21}}>{task.assignedUsers.map(user=>(user))}</h5></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="sideBar">
                        <img className="userpic" src={user.picture} alt={user.name} />
                        <br />
                        <h2 className="username">{user.name.toUpperCase()}</h2>
                        <div className="buttonList">
                            <button className="elseButton">Profile</button>
                            <button className="createButton">Projects </button>
                            <button className="elseButton">Sign Out</button>
                        </div>
                    </div>
                </div>
                <CreateTaskForm toShow={showCreateTaskForm} setToShow={setShowCreateTaskForm} projectId={projectId} setTasksList={setTasks}/>
            </div>
        )
    } else {
        return (
            <div>
                <p>Please log in</p>
            </div>
        )
    }
}
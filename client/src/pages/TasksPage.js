import React from "react";
import { useState } from "react";
import '../assets/Tasks.css'
import { useEffect } from "react";
import axios from 'axios';
//import crown from '../assets/images/crown.svg'
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import {Breadcrumb} from 'react-bootstrap';
import { Table } from "react-bootstrap";
import { CreateTaskForm, DeleteTaskForm, EditTaskForm } from "../components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function TasksPage({socket}) {

    const { user } = useAuth0();
    const {projectId, teamId} = useParams();


    let { isAuthenticated, logout } = useAuth0();
    const [tasks, setTasks] = useState([]);
    const [taskIdToDelete, setTaskIdToDelete] = useState();
    const [taskNameToDelete, setTaskNameToDelete] = useState('');
    const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
    const [showEditTaskForm, setShowEditTaskForm] = useState(false);
    const [showDeleteTaskForm, setShowDeleteTaskForm] = useState(false);
    const [project, setProject] = useState({});
    const navigate = useNavigate();
    const [taskToEdit, setTaskToEdit] = useState([]);

    useEffect(()=>{
        if (projectId !== null){
            socket.emit('joinTasksPage', {projectId})
        }
        async function getProjectTasks() {
            if (projectId){
                const result = await axios.get(`/api/tasks/project/${projectId}`);
                setTasks(result.data);
            }
        }
        async function getProject(){
            if (projectId){
                const result = await axios.get(`/api/projects/project/${projectId}`);
                setProject(result.data);
            }
        }
        getProjectTasks();
        getProject();
    },[])
 
    useEffect(()=>{
        socket.on('task-added', (task)=>{
            setTasks(tasks  => [...tasks, task])
        })
        socket.on('task-deleted', ({taskId})=>{
            setTasks(tasks => tasks.filter((task)=>task._id !== taskId));
        })

        socket.on('task-updated', (taskEdited)=>{
            setTasks(tasks=>{
                return tasks.map((task)=>{
                    return task._id === taskEdited._id ? taskEdited : task;
                })
            })
        })
    }, [socket])

    function colorImportance(importance){
        switch(importance){
            case "High":
                return <span style={{backgroundColor:"#E17070", borderRadius:'10%', paddingTop: '2%',paddingRight:'30%', paddingLeft: '30%'}}>{importance}</span>
            case "Medium":
                return <span style={{backgroundColor:"#FFCD1D", borderRadius:'10%', paddingTop: '2%',paddingRight:'30%', paddingLeft: '30%'}}>{importance}</span>
            case "Low":
                return <span style={{backgroundColor:"#A8DC89", borderRadius:'10%', paddingTop: '2%',paddingRight:'30%', paddingLeft: '30%'}}>{importance}</span>
            default:
                return <span>{importance}</span>
        }
    }

    function colorStatus(status){
        switch(status){
            case "Finished":
                return <span style={{backgroundColor:"#A8DC89", borderRadius:'10%', paddingTop: '2%',paddingRight:'10%', paddingLeft: '10%'}}>{status}</span>
            case "Pending":
                return <span style={{backgroundColor:"#E17070", borderRadius:'10%', paddingTop: '2%',paddingRight:'10%', paddingLeft: '10%'}}>{status}</span>
            case "In-progress":
                return <span style={{backgroundColor:"#FFCD1D", borderRadius:'10%', paddingTop: '2%'}}>{status}</span>
            default:
                return <span>{status}</span>
        }
    }

    function handleDeleteButton(e, taskId, taskName){
        e.stopPropagation();
        setTaskIdToDelete(taskId);
        setTaskNameToDelete(taskName);
        setShowDeleteTaskForm(true);
    }

    if (isAuthenticated) {
        return (
            <div>
                <div id='wrapperTasks'>
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to:'/'}}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to:`/teams-page`}}>Teams Page</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to:`/${teamId}/projects-page`}}>Projects Page</Breadcrumb.Item>
                        <Breadcrumb.Item active>Tasks Page</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="tasks">
                        <h1>{project?.projectName} Tasks:</h1>
                        <button className="addTaskButton" onClick={()=>setShowCreateTaskForm(true)}>+ Add Task</button>
                        <div className="listOfTasks">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Description</th>
                                        <th>Deadline</th>
                                        <th>Status</th>
                                        <th>Importance</th>
                                        <th>Executors</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks.map((task,index)=>{
                                            return (
                                                <tr key={index} className="task"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowEditTaskForm(!showEditTaskForm);
                                                    setTaskToEdit(task);
                                                }}> 
                                                    <td className="taskTitle">{task.taskName}</td>
                                                    <td className="taskTitle">{task.description}</td>
                                                    <td>{new Date(task.deadline).toDateString()}</td>
                                                    <td>{colorStatus(task.status)}</td>
                                                    <td className="taskImportance">{colorImportance(task.importance)}</td>
                                                    <td>
                                                        <ul>
                                                            {task.assignedUsers.map(user=>(<li>{user}</li>))}
                                                        </ul>
                                                    </td>
                                                    <td>
                                                    <button className="deleteTask" onClick={(e)=>{
                                                        handleDeleteButton(e, task._id, task.taskName);
                                                    }}>
                                                        Delete
                                                    </button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="sideBarTasks">
                        <img className="userpicTasks" src={user.picture} alt={user.name} />
                        <br />
                        <h2 className="usernameTasks">{user.name.toUpperCase()}</h2>
                        <div className="buttonListTasks">
                            <button  onClick={()=> { navigate(`/${teamId}/projects-page`) }} className="createButtonTasks">Projects </button>
                            <button  onClick={()=> { logout({returnTo: window.location.origin})}}className="elseButtonTasks">Sign Out</button>
                        </div>
                    </div>
                </div>
                <CreateTaskForm toShow={showCreateTaskForm} socket={socket} setToShow={setShowCreateTaskForm} projectId={projectId} setTasksList={setTasks}/>
                <EditTaskForm toShow={showEditTaskForm} socket={socket} setToShow={setShowEditTaskForm} task={taskToEdit} setTasks={setTasks} />
                <DeleteTaskForm toShow={showDeleteTaskForm} socket={socket} setToShow={setShowDeleteTaskForm} taskId={taskIdToDelete} taskName={taskNameToDelete} setTasks={setTasks} projectId={projectId}/>
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
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



export default function TasksPage({socket}) {

    const { user } = useAuth0();
    const {projectId, teamId} = useParams();

    let { isAuthenticated } = useAuth0();
    const [tasks, setTasks] = useState([]);
    const [taskIdToDelete, setTaskIdToDelete] = useState();
    const [taskNameToDelete, setTaskNameToDelete] = useState('');
    const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
    const [showEditTaskForm, setShowEditTaskForm] = useState(false);
    const [showDeleteTaskForm, setShowDeleteTaskForm] = useState(false);
    const [project, setProject] = useState({});

    const [taskToEdit, setTaskToEdit] = useState([]);

    useEffect(()=>{
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
                return <span style={{backgroundColor:'red'}}>{importance}</span>
            case "Medium":
                return <span style={{backgroundColor:'orange'}}>{importance}</span>
            case "Low":
                return <span style={{backgroundColor:'yellow'}}>{importance}</span>
            default:
                return <span>{importance}</span>
        }
    }

    function colorStatus(status){
        switch(status){
            case "Completed":
                return <span style={{backgroundColor:'green'}}>{status}</span>
            case "In progress":
                return <span style={{backgroundColor:'orange'}}>{status}</span>
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
                <div id='wrapper'>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/teams-page">Teams Page</Breadcrumb.Item>
                        <Breadcrumb.Item href={`/${teamId}/projects-page`}>Projects Page</Breadcrumb.Item>
                        <Breadcrumb.Item active>Tasks Page</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="teams">
                        <h1>//{project?.projectName}\\ Tasks:</h1>
                        <button className="addTaskButton" onClick={()=>setShowCreateTaskForm(true)}>+ Add Task</button>
                        <div className="listOfTasks">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            Task
                                        </th>
                                        <th>
                                            Description
                                        </th>
                                        <th>
                                            Deadline
                                        </th>
                                        <th>
                                            Status
                                        </th>
                                        <th>
                                            Importance
                                        </th>
                                        <th>
                                            Executors
                                        </th>
                                        <th>
                                            buttons...
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks.map((task,index)=>{
                                            return (
                                                <tr key={index} > 
                                                    <td>{task.taskName}</td>
                                                    <td>{task.description}</td>
                                                    <td>{new Date(task.deadline).toDateString()}</td>
                                                    <td>{colorStatus(task.status)}</td>
                                                    <td>{colorImportance(task.importance)}</td>
                                                    <td>
                                                        <ul>
                                                            {task.assignedUsers.map(user=>(<li>{user}</li>))}
                                                        </ul>
                                                    </td>
                                                    <td><button onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowEditTaskForm(!showEditTaskForm);
                                                        setTaskToEdit(task);
                                                    }}>
                                                        Edit
                                                    </button>
                                                    <button onClick={(e)=>{
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
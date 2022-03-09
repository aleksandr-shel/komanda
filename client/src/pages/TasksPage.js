import React from "react";
import { useState } from "react";
import CreateTeamForm from './../components/CreateTeamForm';
import '../assets/Tasks.css'
import { useEffect } from "react";
import axios from 'axios';
//import crown from '../assets/images/crown.svg'
import { useAuth0 } from "@auth0/auth0-react";
import ChangeTeamMembersForm from '../components/ChangeTeamMembersForm';
import { AiOutlineCrown } from "react-icons/ai"

export default function TasksPage() {

    const { user } = useAuth0();

    let { isAuthenticated } = useAuth0();

    const userId = isAuthenticated ? user?.sub.split('|')[1] : null;

    if (isAuthenticated) {
        return (
            <div>
                <div id='wrapper'>
                    <div className="teams">
                        <h1>//Project Name\\ Tasks:</h1>
                        <button className="addTaskButton">+ Add Task</button>
                        <div className="listOfTasks">
                            <table>
                                <div className="tasksListHeader"> 
                                    <tr > 
                                        <td><h5 style={{paddingRight: 380}}>Description</h5></td>
                                        <td><h5 style={{paddingRight: 80}}>Deadline</h5></td>
                                        <td><h5 style={{paddingRight: 80}}>Status</h5></td>
                                        <td><h5 style={{paddingRight: 32}}>Executors</h5></td>
                                    </tr>
                                </div>
                            </table>
                            <table>
                                <div className="tasksListHeader"> 
                                    <tr > 
                                        <td><h5 style={{paddingRight: 40}}>Create a User model in the DB (reference in...)</h5></td>
                                        <td><h5 style={{paddingRight: 80}}>03/04/22</h5></td>
                                        <td><h5 style={{paddingRight: 19, paddingLeft: 19, backgroundColor: "#FFCD1D"}}>In Progress</h5></td>
                                        <td><h5 style={{paddingRight: 31, paddingLeft: 21}}>See List</h5></td>
                                    </tr>
                                </div>
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
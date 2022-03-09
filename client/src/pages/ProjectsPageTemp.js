import React from "react";
import { useState } from "react";
import '../assets/Projects.css'
import { useEffect } from "react";
import axios from 'axios';
//import crown from '../assets/images/crown.svg'
import { useAuth0 } from "@auth0/auth0-react";

export default function TeamsPageTemporary() {

    const { user } = useAuth0();

    let { isAuthenticated } = useAuth0();

    const userId = isAuthenticated ? user?.sub.split('|')[1] : null;

    const [showCreateTeamForm, setShowCreateTeamForm] = useState(false);
    const [teamsList, setTeamsList] = useState([]);

    const [showAddMembersForm, setShowAddMembersForm] = useState(false);

    let [teamId, setTeamId] = useState();

    useEffect(() => {
        async function getUserTeams() {
            if (userId) {
                const result = await axios.get(`/api/users/${userId}/teams`)
                setTeamsList(result.data);
            }
        }
        getUserTeams();
    }, [userId, showCreateTeamForm])

    if (isAuthenticated) {
        return (
        <div>
            <div id='wrapper'>
                <div className="projects">
                <h1>/Team Name\ Projects</h1>
                <h5>Here is a list of projects created by /Team Name\...</h5>
                <div className="listofproject">
                <div className="addProject">
                    <h1 className="plusSign">+</h1>
                    <h2 className="addText"> Add New Project</h2>
                </div>
                <div className="project">
                    <h2 className="projectName">Project Name</h2>
                    <br />
                    <p>/Team Name\</p>
                    <br /><br /><br />
                        </div>
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
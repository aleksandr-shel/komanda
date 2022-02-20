import React from "react";
import { useState } from "react";
import CreateTeamForm from './../components/CreateTeamForm';
import '../assets/Teams.css'
import { useEffect } from "react";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import AddTeamMembersForm from './../components/AddTeamMembersForm';

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
                <button className="createButton" >
                    Create Team
                </button>
               
                    <h3>Teams:</h3>
                <div className="teams">
                <div className="addTeam" onClick={() => setShowCreateTeamForm(!showCreateTeamForm)}>
                    <h1 className="plusSign">+</h1>
                    <h2 className="addText"> Add New Team</h2>
                </div>
                {teamsList.map((team, index) => {
                    return (
                        <div className="team" key={index}>
                            Team Name: {team.teamName}
                            <br />
                            Team Owner: {team.teamOwner}
                            <br />
                            Number of Users: {team.users.length}
                            <br />
                            Number of Projects: {team.projects.length}
                            <br />
                            <button style={{ padding: '10px' }} onClick={() => {
                                setShowAddMembersForm(!showAddMembersForm);
                                setTeamId(team._id);
                            }}>
                                Add Member
                            </button>
                            <br />
                            <br />
                        </div>
                    )
                })}</div>
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
                <CreateTeamForm toShow={showCreateTeamForm} setToShow={setShowCreateTeamForm} />
                <AddTeamMembersForm toShow={showAddMembersForm} setToShow={setShowAddMembersForm} teamId={teamId} />
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
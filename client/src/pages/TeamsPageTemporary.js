import React from "react";
import { useState } from "react";
import CreateTeamForm from './../components/CreateTeamForm';
import '../assets/Teams.css'
import { useEffect } from "react";
import axios from 'axios';
//import crown from '../assets/images/crown.svg'
import { useAuth0 } from "@auth0/auth0-react";
import ChangeTeamMembersForm from '../components/ChangeTeamMembersForm';
import { AiOutlineCrown } from "react-icons/ai"

export default function TeamsPageTemporary() {

    const { user } = useAuth0();

    let { isAuthenticated } = useAuth0();

    const userId = isAuthenticated ? user?.sub.split('|')[1] : null;

    const [showCreateTeamForm, setShowCreateTeamForm] = useState(false);
    const [teamsList, setTeamsList] = useState([]);

    const [showChangeMembersForm, setShowChangeMembersForm] = useState(false);

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
                    <div className="teams">
                        <h1>Your Current Teams:</h1>
                        <h5>Here is a list of teams that you are a part of...</h5>
                        <div className="listofteams">
                            <div className="addTeam" onClick={() => setShowCreateTeamForm(!showCreateTeamForm)}>
                                <h1 className="plusSign">+</h1>
                                <h2 className="addText"> Add New Team</h2>
                            </div>
                            {teamsList.map((team, index) => {
                                return (
                                    <div className="team" key={index}>
                                        <h2 className="teamName">{team.teamName}</h2>
                                        <br />
                                        {userId === team.teamOwner ?
                                            (<p>Owner: <AiOutlineCrown size={24} /></p>) :
                                            (<p>Owner: {team.teamOwner}</p>)}
                                        <p>Number of Users: {team.users.length}</p>
                                        <br />
                                        <button className="teamMembersButton" onClick={() => {
                                            setShowChangeMembersForm(!showChangeMembersForm);
                                            setTeamId(team._id);
                                        }}>
                                            Team Members
                                        </button>
                                        <br />
                                        <br />
                                    </div>
                                )
                            })}</div>
                    </div>
                    <div className="sideBar">
                        <img className="userpic" src={user.picture} alt={user.name} />
                        <br />
                        <h2 className="username">{user.name.toUpperCase()}</h2>
                        <div className="buttonList">
                            <button className="elseButton">Profile</button>
                            <button className="createButton">Teams </button>
                            <button className="elseButton">Sign Out</button>
                        </div>
                    </div>
                    <CreateTeamForm toShow={showCreateTeamForm} setToShow={setShowCreateTeamForm} />
                    <ChangeTeamMembersForm toShow={showChangeMembersForm} setToShow={setShowChangeMembersForm} teamId={teamId} userId={userId} />
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
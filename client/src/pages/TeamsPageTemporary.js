import React from "react";
import { useState } from "react";
import CreateTeamForm from '../components/CreateTeamForm';
import '../assets/Teams.css'
import { useEffect } from "react";
import axios from 'axios';
//import crown from '../assets/images/crown.svg'
import { useAuth0 } from "@auth0/auth0-react";
import ChangeTeamMembersForm from '../components/ChangeTeamMembersForm';
import { AiOutlineCrown } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import {Breadcrumb} from 'react-bootstrap';

export default function TeamsPage() {

    const { user } = useAuth0();

    let { isAuthenticated } = useAuth0();

    const userId = isAuthenticated ? user?.sub.split('|')[1] : null;

    const navigate = useNavigate();
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


    function selectTeam(teamId){
        navigate(`/${teamId}/projects-page`)
    }

    if (isAuthenticated) {
        return (
            <div>
                <div id='wrapperTeams'>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Teams Page</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="teamsTeams">
                        <h1>Your Current Teams:</h1>
                        <h5>Here is a list of teams that you are a part of...</h5>
                        <div className="listofteamsTeams">
                            <div className="addTeamTeams" onClick={() => setShowCreateTeamForm(!showCreateTeamForm)}>
                                <h1 className="plusSignTeams">+</h1>
                                <h2 className="addTextTeams"> Add New Team</h2>
                            </div>
                            {teamsList.map((team, index) => {
                                return (
                                    <div onClick={()=>{selectTeam(team._id)}} className="teamTeams" key={index}>
                                        <h2 className="teamNameTeams">{team.teamName}</h2>
                                        <br />
                                        {userId === team.teamOwner ?
                                            (<p className="detailsTeams">Owner: <AiOutlineCrown size={24} /></p>) :
                                            (<p className="detailsTeams">Owner: {team.teamOwner}</p>)}
                                        <p className="detailsUsersTeams">Number of Users: {team.users.length}</p>
                                        <br />
                                        <button className="teamMembersButtonTeams" onClick={(e) => {
                                            e.stopPropagation();
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
                    <div className="sideBarTeams">
                        <img className="userpicTeams" src={user.picture} alt={user.name} />
                        <br />
                        <h2 className="usernameTeams">{user.name.toUpperCase()}</h2>
                        <div className="buttonListTeams">
                            <button className="elseButtonTeams">Profile</button>
                            <button className="createButtonTeams">Home </button>
                            <button className="elseButtonTeams">Sign Out</button>
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
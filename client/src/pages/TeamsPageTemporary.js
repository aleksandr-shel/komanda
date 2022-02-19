import React from "react";
import { useState } from "react";
import CreateTeamForm from './../components/CreateTeamForm';
import { useEffect } from "react";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";


export default function TeamsPageTemporary() {

    const { user } = useAuth0();

    let { isAuthenticated } = useAuth0();

    const userId = isAuthenticated ? user?.sub.split('|')[1] : null;

    const [showCreateTeamForm, setShowCreateTeamForm] = useState(false);

    const [teamsList, setTeamsList] = useState([]);

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
                <button style={{ padding: '10px' }} onClick={() => setShowCreateTeamForm(!showCreateTeamForm)}>
                    Create Team
                </button>
                <h3>Teams:</h3>
                {teamsList.map((team, index) => {
                    return (
                        <div key={index}>
                            Team Name: {team.teamName}
                            <br />
                            Team Owner: {team.teamOwner}
                            <br />
                            Number of Users: {team.users.length}
                            <br />
                            Number of Projects: {team.projects.length}
                            <br />
                            <br />
                        </div>
                    )
                })}
                <CreateTeamForm toShow={showCreateTeamForm} setToShow={setShowCreateTeamForm} />
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
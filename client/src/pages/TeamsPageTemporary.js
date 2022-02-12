import React from "react";
import { useState } from "react";
import CreateTeamForm from './../components/CreateTeamForm';
import { useEffect } from "react";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";


export default function TeamsPageTemporary(){

    const {user} = useAuth0();

    const userId = user?.sub.split('|')[1];

    const [showCreateTeamForm, setShowCreateTeamForm] = useState(false);

    const [teamsList, setTeamsList] = useState([]);

    useEffect(async ()=>{
        if (userId) {
            const result = await axios.get(`/api/users/${userId}/teams`)
            setTeamsList(result.data);
        }
    }, [userId, showCreateTeamForm])
    
    return(
        <div>
            <button style={{padding:'10px'}} onClick={()=>setShowCreateTeamForm(!showCreateTeamForm)}>
                Create Team
            </button>
            <h3>Teams ids:</h3>
            {teamsList.map((item, index)=>{
                return(
                    <div key={index}>
                        {index + 1}) {item}
                    </div>
                )
            })}
            <CreateTeamForm toShow={showCreateTeamForm} setToShow={setShowCreateTeamForm}/>
        </div>
    )
}
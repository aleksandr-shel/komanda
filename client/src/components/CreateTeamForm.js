import React from "react";
import styled from "styled-components";
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from "react";
import axios from 'axios';

const mongoose = require('mongoose');

export default function CreateTeamForm({ toShow, setToShow }) {
    const { user } = useAuth0();

    const userId = mongoose.Types.ObjectId(user?.sub?.split('|')[1]);

    const [teamName, setTeamName] = useState();
    async function handleCreateTeamButton() {
        const result = await axios.post('/api/teams/create', {
            teamName,
            teamOwner: userId,
        })
        console.log(result.data);
        setToShow(false);
    }

    return (
        <FormContainer style={{ display: toShow ? 'flex' : 'none' }} onClick={()=>setToShow(false)}>
            <div className="form-container" onClick={e=>e.stopPropagation()}>
                <h1>Create a Team</h1>
                <input
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    type="text"
                    placeholder="Team Name" />
                <button onClick={handleCreateTeamButton}>Create Team</button>
            </div>
        </FormContainer>
    )
}

const FormContainer = styled.div`
    z-index: 1;
    position: absolute;
    top:0;
    left:0;
    filter: alpha(opacity=60);
    display: flex;
    min-height: 100vh;
    min-width: 100%;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
    
    .form-container{
        background-color: white;
        border: 2px solid black;
        border-radius: 8px;
        min-width: 300px;
        max-width: 800px;
        padding: 32px;
    }

    button, input{
        border: 1px solid black;
        border-radius: 8px;
        display: inline-block;
        font-size: 16px;
        padding: 8px;
    }

    input{
        margin: 14px 20px 14px 0;
        padding: 8px;
    }

    button{
        cursor: pointer;
        margin: 8px 0;
        width: 100%;
    }

`;
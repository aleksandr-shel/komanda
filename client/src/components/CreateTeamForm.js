import React from "react";
import styled from "styled-components";
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from "react";
import axios from 'axios';


export default function CreateTeamForm({toShow, setToShow}){
    const {user} = useAuth0();

    const userId = user?.sub?.split('|')[1] || '';

    const [teamName, setTeamName] = useState();
    async function handleCreateTeamButton(){
        const result = await axios.post('/api/teams/create',{
            teamName,
            teamOwner: userId,
        })
        console.log(result.data);
        setToShow(false);
    }

    return (
        <FormContainer style={{display: toShow ? 'flex':'none'}}>
            <div className="form-container">
                <h1>Create a Team</h1>
                <input
                    value={teamName}
                    onChange={(e)=>setTeamName(e.target.value)}
                    type="text"
                    placeholder="Team Name"/>
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
    opacity: 0.8;
    filter: alpha(opacity=60);
    display: flex;
    background-color: #ddd;
    min-height: 100vh;
    min-width: 100%;
    align-items: center;
    justify-content: center;
    
    .form-container{
        background-color: white;
        border-radius: 8px;
        min-width: 300px;
        max-width: 800px;
        padding: 32px;
    }

    button, input{
        border-radius: 8px;
        box-sizing: border-box;
        display: block;
        font-size: 16px;
        margin: 8px 0;
        padding: 8px;
        width: 100%;
    }

    input{
        border: 1px solid black;
    }

    button{
        border: 1px solid black;
        cursor: pointer;
    }

`;
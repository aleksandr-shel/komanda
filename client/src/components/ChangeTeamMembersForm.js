import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function ChangeTeamMembersForm({ toShow, setToShow, teamId }) {

    let [usersList, setUsersList] = useState([]);
    useEffect(() => {
        axios.get('/api/users')
            .then(res => setUsersList(res.data))
            .catch(err => console.log(err));
    }, [])

    let [initialTeamMembers, setInitialTeamMembers] = useState([]); //array of initial team members
    let [chosenUsers, setChosenUsers] = useState([]);
    let [teamOwner, setTeamOwner] = useState();
    useEffect(() => {
        if (teamId) {
            axios.get(`/api/teams/${teamId}/users`)
                .then(res => {
                    const { usersArrayTemp, teamOwnerTemp } = res.data;

                    setInitialTeamMembers(usersArrayTemp);
                    setChosenUsers(usersArrayTemp);

                    setTeamOwner(teamOwnerTemp);
                })
        }
    }, [teamId])

    //USED FOR DEBUGGING
    /*useEffect(() => {
        console.log("chosenUsers: " + chosenUsers)
    }, [chosenUsers])*/

    const handleCheckboxChange = event => {
        let updatedList = [...chosenUsers];
        if (event.target.checked) {
            updatedList = [...chosenUsers, event.target.value];
        } else {
            updatedList.splice(chosenUsers.indexOf(event.target.value), 1);
        }

        setChosenUsers(updatedList);
    };

    async function handleAddMembersButton() {
        //in chosenUsers but not in the initialTeamMembers
        let usersToAdd = chosenUsers.filter(x => !initialTeamMembers.includes(x));

        //in initialTeamMembers array but not in chosenUsers
        let usersToRemove = initialTeamMembers.filter(x => !chosenUsers.includes(x));

        const result = await axios.post(`/api/teams/${teamId}/changeMembers`, {
            chosenUsers,
            teamId,
            usersToAdd,
            usersToRemove
        })
        console.log(result.data);
        setToShow(false);
    }

    return (
        <FormContainer style={{ display: toShow ? 'flex' : 'none' }}>
            <div className="form-container">
                <h1>Choose a Person</h1>

                <form>
                    <div>

                        {usersList.map((user, index) => {
                            return (
                                <div key={index}>
                                    {chosenUsers.includes(user._id) && teamOwner !== user._id
                                        ? < input type="checkbox" id={user._id} value={user._id} onChange={handleCheckboxChange} checked />
                                        : chosenUsers.includes(user._id) && teamOwner === user._id
                                            ? < input type="hidden" id={user._id} value={user._id} />
                                            : < input type="checkbox" id={user._id} value={user._id} onChange={handleCheckboxChange} />
                                    }
                                    <label htmlFor={user._id}>{user.email}</label>
                                    <br />
                                </div>
                            )
                        })}

                    </div>
                </form>

                <button onClick={handleAddMembersButton}>Change Team Composition</button>
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
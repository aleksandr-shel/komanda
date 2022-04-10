import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function ChangeTeamMembersForm({ toShow, setToShow, teamId, userId }) {
    let [usersList, setUsersList] = useState([]);
    useEffect(() => {
        axios.get('/api/users')
            .then(res => setUsersList(res.data))
            .catch(err => console.log(err));
    }, [])

    let [initialTeamMembers, setInitialTeamMembers] = useState([]); //array of initial team members
    let [initialTeamMembersId, setInitialTeamMembersId] = useState([]);
    let [chosenUsers, setChosenUsers] = useState([]);
    let [teamOwner, setTeamOwner] = useState();
    useEffect(() => {
        if (teamId) {
            axios.get(`/api/teams/${teamId}/users`)
                .then(res => {
                    const { usersArrayTemp, teamOwnerTemp, userObjects } = res.data;

                    setInitialTeamMembers(usersArrayTemp);
                    setChosenUsers(usersArrayTemp);
                    setInitialTeamMembersId(userObjects);

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

    function renderUsersList() {
        if (userId === teamOwner) {
            return (
                usersList.map((user, index) => {
                    return (
                        <div key={index}>
                            {chosenUsers.includes(user._id) && teamOwner !== user._id
                                ?
                                <>
                                    <input type="checkbox" id={user._id} value={user._id} onChange={handleCheckboxChange} checked />
                                    <label htmlFor={user._id}>{user.email}</label>
                                </>
                                : chosenUsers.includes(user._id) && teamOwner === user._id
                                    ? <></>
                                    :
                                    <>
                                        <input type="checkbox" id={user._id} value={user._id} onChange={handleCheckboxChange} />
                                        <label htmlFor={user._id}>{user.email}</label>
                                    </>

                            }
                        </div >
                    )
                })
            )
        } else {
            return (
                initialTeamMembersId.map((user, index) => {
                    return (
                        <div key={index}>
                            {user.email}
                        </div>
                    )
                }))
        }
    }

    return (
        <FormContainer style={{ display: toShow ? 'flex' : 'none' }} onClick={()=>setToShow(false)}>
            <div className="form-container" onClick={e=>e.stopPropagation()}>
                {userId === teamOwner
                    ? <h1>Choose a Person</h1>
                    : <h1>Team Members</h1>
                }              

                <div>
                    {renderUsersList()}
                </div>
                {userId === teamOwner
                    ?
                    <>
                        < button onClick={handleAddMembersButton}>Change Team Composition</button>
                        < button onClick={() => setToShow(false)} >Close</button>
                    </>
                    : < button onClick={() => setToShow(false)} >Close</button>
                }
            </div>
        </FormContainer >
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
        max-width: 100%;
        min-height: 40vh;
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
        margin: 14px 20px;
        padding: 8px;
    }

    button{
        cursor: pointer;
        margin: 8px 0;
        width: 100%;
    }

`;
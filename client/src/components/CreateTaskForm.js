import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

export function CreateTaskForm({toShow, setToShow, projectId, setTasksList}){

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [importance, setImportance] = useState('Medium');
    const [deadline, setDeadline] = useState('');

    //later will do assigned users
    const [assignedUsers, setAssignedUsers] = useState([]);

    async function handleCreateTaskButton(){
        const result = await axios.post('/api/tasks/create',{
            taskName,
            description,
            status: "Started",
            project:projectId,
            importance,
            deadline
        })
        setTasksList(tasks  => [...tasks, result.data])
        clearInputs();
        setToShow(false);
    }

    function clearInputs(){
        setTaskName('');
        setDeadline('');
        setDescription('');
        setImportance('');
    }


    return (
        <FormContainer style={{ display: toShow ? 'flex' : 'none' }} onClick={()=>{clearInputs(); setToShow(false)}}>
            <div className="form-container" onClick={e=>e.stopPropagation()}>
                <h1>Add task</h1>
                <div>
                    <label>
                        Task:
                    </label>
                    <input
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        type="text"
                        placeholder="Task Name" />
                </div>
                <div>
                    <label>
                        Task Description: 
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description" />
                </div>
                <div>
                    <label>
                        Importance: 
                    </label>
                    <select value={importance} onChange={e=>setImportance(e.target.value)}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div>
                    <label>
                        Deadline
                    </label>
                    <input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)}/>
                </div>
                <button onClick={handleCreateTaskButton}>Create Team</button>
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
        display:flex;
        flex-direction: column;
        background-color: white;
        border: 2px solid black;
        border-radius: 8px;
        min-width: 300px;
        max-width: 800px;
        padding: 32px;
    }

    .form-container div{
        padding:  8px;
        margin: 8px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    label {
        display: inline-block;
        padding: 8px 4px;
    }

    button, input, textarea{
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
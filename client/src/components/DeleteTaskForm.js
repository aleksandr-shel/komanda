import React from "react";
import styled from "styled-components";
import axios from 'axios';

export function DeleteTaskForm({toShow, setToShow, taskId, taskName, setTasks, projectId, socket}){

    function handleDelete(){
        axios.delete(`/api/tasks/delete/${taskId}`).then(response=>{
            if (response.status === 200){
                setTasks(tasks => tasks.filter((task)=>task._id !== taskId));
                socket.emit('deleteTask', {taskId, projectId})
                setToShow(false);
            }
        })
    }

    return(
        <FormContainer style={{display: toShow ? 'flex': 'none'}} onClick={()=>{setToShow(false)}}>
            <div className="form-container" onClick={e=>e.stopPropagation()}>
                <h3>Are you sure you want to delete task: {taskName}?</h3>

                <div className="buttons">
                    <button onClick={handleDelete}>
                        Delete
                    </button>
                    <button onClick={()=>setToShow(false)}>
                        Cancel
                    </button>
                </div>
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

    .form-container div:not(.team-members-list div) {
        padding:  8px;
        margin: 8px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    .buttons{
        display:flex;
        justify-content: space-evenly;
    }

    button{
        border: 1px solid black;
        border-radius: 8px;
        display: inline-block;
        font-size: 16px;
        padding: 8px;
        cursor: pointer;
        margin: 8px 0;
        flex: 1 1 50%;
    }
`;
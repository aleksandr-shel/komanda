import React from "react";
import styled from "styled-components";

export default function CreateProjectForm({toShow, setToShow}){
    return (
        <>
            Create Project Form
        </>
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
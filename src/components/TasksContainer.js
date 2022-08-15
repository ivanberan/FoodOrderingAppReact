import React, { useState } from "react";
import styled from "styled-components";
import InputTaskForm from "./InputTaskForm";
import TaskItem from "./TaskItem";



function TasksContainer(props) {
    

    const [showForm, setShowForm] = useState(false)
    const SetShowFormHandler = () => {
        setShowForm(!showForm)
    }
    return (<ContainerDiv>
        <h1>{props.title}</h1>
        <StyledUL>
            {props.data && props.data.map(item =>  (<TaskItem key={item.id} data={item} />))}
        </StyledUL>
        {showForm ? <InputTaskForm title={props.title} SetShowFormHandler={SetShowFormHandler} /> : <StyledButton onClick={SetShowFormHandler}>Add new Task</StyledButton>}
    </ContainerDiv>)

}

export default TasksContainer


const StyledUL = styled.ul`
list-style-type: none;
padding: 0;
margin: 10px;`

const ContainerDiv = styled.div`
flex-direction: column;
background: white;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
border-radius: 10px;
margin-left: 10px;
margin-right: 10px;
h1{
    text-align: center;
}`
const StyledButton = styled.button`
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
border-radius: 10px;
margin: 10px;
font-size: 10px;
background-color:#7ac4ba;
`
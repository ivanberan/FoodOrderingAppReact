import React from "react";
import DetailsModal from './DetailsModal'
import { useState, useContext } from "react";
import TaskContext from "../store/task-ctx";
import styled from "styled-components";
function TaskItem(props) {
    const { title } = props.data
    const [showModal, setShowModal] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    const taskCtx = useContext(TaskContext)

    const toggleModalHandler = () => {
        setShowModal(prevState => !prevState)
    }
    const toggleDropdownHandler = () => {
        setShowDropdown(prevState => !prevState)
    }

    const changeTasktStateHandler = (event) => {
        const Task = {
            id: props.data.id,
            title: props.data.title,
            description: props.data.description,
            state: event.target.value
        }
        taskCtx.updateTasks(Task)
    }

    let avaliableStatuses = taskCtx.containerNames
    avaliableStatuses = avaliableStatuses.filter(item => item !== props.data.state)

    const dropdownContent =
        <DropdownDiv onMouseLeave={toggleDropdownHandler} onMouseEnter={toggleDropdownHandler}>
            {avaliableStatuses.map(item => (<button onClick={changeTasktStateHandler} value={item}>{item}</button>))}
        </DropdownDiv>

    return (
        <ItemCard >
            {showModal && <DetailsModal data={props.data} toggleModalHandler={toggleModalHandler} />}
            <div onClick={toggleModalHandler}>
                <p>{title}</p>
            </div>
            <button onMouseEnter={toggleDropdownHandler} onMouseLeave={toggleDropdownHandler}>Move task</button>
            {showDropdown && dropdownContent}

        </ItemCard>
    )
}
export default TaskItem

const ItemCard = styled.li`
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 2px solid #dddddd;
  border-radius: 12px;
  padding: 5px;
  max-width: 150;
`

const DropdownDiv = styled.div` 
    position: absolute;
    background-color: #f1f1f1;
    min-width: 120px;
    overflow: auto;
    display:flex;
    flex-direction:column;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  button
  { color: black;
    width:100px;
    padding: 2px 6px;
    text-decoration: none;
    display: block;}
    button:hover
    {  background: #b0eaff;
    }`

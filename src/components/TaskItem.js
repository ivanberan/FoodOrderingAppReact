import React, { useCallback } from "react";
import DetailsModal from "./DetailsModal";
import { useState, useContext } from "react";
import TaskContext from "../store/task-ctx";
import styled from "styled-components";
function TaskItem(props) {
  const { title } = props.data;
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const taskCtx = useContext(TaskContext);
  const { updateTasks } = taskCtx;

  const toggleModalHandler = useCallback(() => {
    setShowModal((prevState) => !prevState);
  }, []);
  const toggleDropdownHandler = useCallback(() => {
    setShowDropdown((prevState) => !prevState);
  }, []);

  const changeTasktStateHandler = useCallback(
    (event) => {
      const { id, title, description } = props.data;
      const Task = {
        id: id,
        title: title,
        description: description,
        state: event.target.value,
      };
    //   console.log('++++++++++++')
    //   console.log(Task)
      updateTasks(Task);
    },
    [props, updateTasks]
  );

  let avaliableStatuses = taskCtx.containerNames;
  avaliableStatuses = avaliableStatuses.filter(
    (item) => item !== props.data.state
  );

  const dropdownContent = (
    <DropdownDiv
      onMouseLeave={toggleDropdownHandler}
      onMouseEnter={toggleDropdownHandler}
    >
      {avaliableStatuses.map((item) => (
        <button key={item} onClick={changeTasktStateHandler} value={item}>
          {item}
        </button>
      ))}
    </DropdownDiv>
  );
  return (
    <ItemCard key={props.data.id}>
      {showModal && (
        <DetailsModal
          data={props.data}
          toggleModalHandler={toggleModalHandler}
        />
      )}
      <div onClick={toggleModalHandler}>
        <p>{title}</p>
      </div>
      <StyledButton
        onMouseEnter={toggleDropdownHandler}
        onMouseLeave={toggleDropdownHandler}
      >
        Move task
      </StyledButton>
      {showDropdown && dropdownContent}
    </ItemCard>
  );
}
export default TaskItem;


const ItemCard = styled.li`
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 2px solid #dddddd;
  border-radius: 12px;
  padding: 5px;
  max-width: 150;
`;

const DropdownDiv = styled.div`

  position: absolute;
  background-color: #f1f1f1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  button {
    color: black;
    width: 100px;
    padding: 2px 6px;
    text-decoration: none;
    display: block;
  }
  button:hover {
    background: #b0eaff;
  }
`;
const StyledButton = styled.button`
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
border-radius: 10px;

font-size: 15px;
background-color:#7ac4ba;
`
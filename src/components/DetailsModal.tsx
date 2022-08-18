import React from "react";
import styled from "styled-components";
import { useState, useContext, ChangeEvent } from "react";
import TaskContext from "../store/task-ctx";
 //import {TaskInterface} from '../models/models'
interface TaskInterface {
  id?: string;
  title: string;
  description: string;
  state: string;
}

export const DetailsModal: React.FC<{
  data: TaskInterface;
  toggleModalHandler: () => void;
}> = (props) => {
  const [titleInput, setTitleInput] = useState(props.data.title);
  const [taskInput, setTaskInput] = useState(props.data.description);

  const taskCtx = useContext(TaskContext);

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };
  const onChangeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskInput(event.target.value);
  };
  const updateHandler = () => {
    const Task = {
      id: props.data.id,
      title: titleInput,
      description: taskInput,
      state: props.data.state,
    };
    taskCtx.updateTasks(Task);
  };
  return (
    <ModalDiv>
      <ModalContainer>
        <h1>Task title</h1>
        <input onChange={onChangeTitleHandler} value={titleInput}></input>
        <h1>Description</h1>
        <input onChange={onChangeTaskHandler} value={taskInput}></input>
        <br />
        <button onClick={updateHandler}>Update</button>
        <button onClick={props.toggleModalHandler}>Close</button>
      </ModalContainer>
    </ModalDiv>
  );
};
export default DetailsModal;

const ModalDiv = styled.div`
  color: black;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  left: 0px;
`;
const ModalContainer = styled.div`
  width: 250px;
  height: 300px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

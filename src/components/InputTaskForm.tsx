import React, { ChangeEvent, FormEvent } from "react";
import { useContext, useState } from "react";
import TaskContext from "../store/task-ctx";
import styled from "styled-components";
const InputTaskForm: React.FC<{
  SetShowFormHandler: () => void;
  title: string;

}> = (props) => {
  const taskCtx = useContext(TaskContext);

  const [titleInput, setTitleInput] = useState<string>("");
  const [taskInput, setTaskInput] = useState<string>("");

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };
  const onChangeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskInput(event.target.value);
  };

  const onSubmitFormHandler = (event: FormEvent) => {
    event.preventDefault();
    const Task = {
      title: titleInput,
      description: taskInput,
      state: props.title.toLowerCase(),
    };
    console.log(Task);
    taskCtx.setTasks(Task);
    props.SetShowFormHandler();
  };

  return (
    <form onSubmit={onSubmitFormHandler}>
      <div>
        <p>Task title</p>
        <input onChange={onChangeTitleHandler} value={titleInput}></input>
      </div>
      <div>
        <p>Task description</p>
        <input onChange={onChangeTaskHandler} value={taskInput}></input>
      </div>
      <StyledButton type="submit">Add</StyledButton>
      <StyledCloseButton
        onClick={() => {
          props.SetShowFormHandler();
        }}
      >
        Close
      </StyledCloseButton>
    </form>
  );
};

export default InputTaskForm;

const StyledButton = styled.button`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  font-size: 10px;
  background-color: #7ac4ba;
`;
const StyledCloseButton = styled.button`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  font-size: 10px;
  background-color: #ff5a5a;
`;

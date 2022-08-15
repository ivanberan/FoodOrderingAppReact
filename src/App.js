import React, { useCallback, useEffect, useContext, useState } from 'react';
import TasksContainer from './components/TasksContainer';
import styled from 'styled-components';
import TaskContext from './store/task-ctx';
import NewListForm from './components/NewListForm';

function App() {
  const taskCtx = useContext(TaskContext)


  const getData = useCallback(async () => {
    const response = await fetch(process.env.REACT_APP_URL)
    const data = await response.json()
    taskCtx.setTasks(data)
  }, [])


  useEffect(() => {
    getData()
  }, [getData])

  return (
    <React.Fragment>
      <Header>
        <div>Đira</div>
        <NewListForm/>
      </Header>
      <MainDiv >
        {taskCtx.containerNames.map(item => (<TasksContainer key={item} title={item} data={taskCtx.tasks.filter(task => { return task.state === item })} />))}
      </MainDiv>
    </React.Fragment>
  );
}

export default App;


const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
`
const Header = styled.div`
height: 100px;
  text-align: center;
  background: #7ac4ba;
  color: white;
  font-size: 30px;
  justify-content: space-evenly;
  display:flex;
`
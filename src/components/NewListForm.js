import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import TaskContext from '../store/task-ctx';

const NewListForm = () => {
    const taskCtx = useContext(TaskContext)

    const [newList, setNewList] = useState("")

    const setNewListHandler = (event) => {
        setNewList(event.target.value)
    }

    const newListAddHandler = (event) => {
        event.preventDefault()
        if (newList.length > 0) {
            taskCtx.setLists(newList)
        }
        setNewList("")
    }


    return (
        <NewListDiv>
            <form onSubmit={newListAddHandler}>
                <p>Add new list</p>
                <input onChange={setNewListHandler} value={newList}></input>
                <br />
                <button >Add list</button>
            </form>
        </NewListDiv>
    )

}
export default NewListForm

const NewListDiv = styled.div`
display: flex;
flex-direction: column;
font-size: 15px;
justify-content: space-evenly;
`
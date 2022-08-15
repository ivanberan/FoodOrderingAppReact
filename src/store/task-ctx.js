import { createContext, useState, useCallback } from "react";

const TaskContext = createContext({
    tasks: [],
    containerNames: [],
    setTasks: () => { },
    setLists: () => { },
    updateTasks: () => { },
    getData: () => { }
}
)


export const AuthContextProvider = (props) => {

    // const getData = useCallback(async () => {
    //     const response = await fetch(process.env.REACT_APP_URL)
    //     const data = await response.json()
    //     setTasks(data)
    // }, [])

    async function postData(task) {
        const response = await fetch(process.env.REACT_APP_URL, {
            method: "POST",
            body: JSON.stringify(task),
            headers: { "Content-Type": "application/json" },
        }
        )
        const data = await response.json()
    }

    async function patchData(task) {
        const response = await fetch(`${process.env.REACT_APP_URL}/${task.id}`, {
            method: "PATCH",
            body: JSON.stringify(task),
            headers: { "Content-Type": "application/json" },
        }
        )
        const data = await response.json()
    }


    const [tasks, setTasks] = useState([]);
    const [lists, setLists] = useState(['todo', 'inprogress', 'done'])


    const setListsHandler = (newList) => {
        setLists(prevState => [...prevState, newList])
    }

    const setTasksHandler = (task) => {
        if (tasks.length > 0) {
            postData(task)
        }
        setTasks(prevState => { return (prevState.concat(task)) })
    }

    // const getDataHandler = () => {
    //     getData()
    // }

    const updateTasksHandler = (task) => {
        const taskIndex = tasks.findIndex(t => t.id === task.id)
        const updatedTasks = [...tasks]
        updatedTasks[taskIndex] = { ...tasks[taskIndex], ...task }
        console.log(updatedTasks)
        setTasks(updatedTasks)
        patchData(task)
    }
    const contextValue = {
        tasks: tasks,
        containerNames: lists,
        setLists: setListsHandler,
        setTasks: setTasksHandler,
        updateTasks: updateTasksHandler,
        // getData: getDataHandler
    };

    return (
        <TaskContext.Provider value={contextValue}>
            {props.children}
        </TaskContext.Provider>
    );
};

export default TaskContext;

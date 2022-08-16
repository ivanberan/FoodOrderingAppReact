import { createContext, useState, useCallback } from "react";

const TaskContext = createContext({
  tasks: [],
  containerNames: [],
  setTasks: () => {},
  setLists: () => {},
  updateTasks: () => {},
  getData: () => {},
  loadData: () => {},
});

export const AuthContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState(["todo", "inprogress", "done"]);

  // const getData = useCallback(async () => {
  //     const response = await fetch(process.env.REACT_APP_URL)
  //     const data = await response.json()
  //     setTasks(data)
  // }, [])

  const postData = useCallback(async (task) => {
    try {
      const response = await fetch(process.env.REACT_APP_URL, {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Soming is wrong");
      }
      const data = await response.json();
      setTasks((prevState) => {
        return prevState.concat(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const patchData = useCallback(async (task) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Soming is wrong");
      }
      const data = await response.json();
      
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setListsHandler = useCallback((newList) => {
    setLists((prevState) => [...prevState, newList]);
  }, []);

  const setTasksHandler = useCallback(
    (task) => {
      postData(task);
    },
    [postData]
  );

  const loadDataHandler = useCallback((task) => {
    setTasks((prevState) => {
      return prevState.concat(task);
    });
  }, []);

  // const getDataHandler = () => {
  //     getData()
  // }

  const updateTasksHandler = useCallback(
    (task) => {
      setTasks((prevState) => {
        const taskIndex = prevState.findIndex((t) => t.id === task.id);
        prevState[taskIndex] = { ...prevState[taskIndex], ...task };
        return [...prevState];
      });
      patchData(task);
    },
    [patchData]
  );
  const contextValue = {
    tasks: tasks,
    containerNames: lists,
    setLists: setListsHandler,
    setTasks: setTasksHandler,
    updateTasks: updateTasksHandler,
    loadData: loadDataHandler,
    // getData: getDataHandler
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContext;

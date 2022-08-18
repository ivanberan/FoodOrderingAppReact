import React from "react";
import { createContext, useState, useCallback } from "react";

interface TaskInterface {
  id?: string;
  title: string;
  description: string;
  state: string;
}

interface TaskContextInterface {
  tasks: TaskInterface[];
  containerNames: string[];
  setTasks: (task: TaskInterface) => void;
  setLists: (newlist: string) => void;
  updateTasks: (tasl: TaskInterface) => void;
  loadData: (task: TaskInterface[]) => void;
}

const TaskContext = createContext<TaskContextInterface>({
  tasks: [],
  containerNames: [],
  setTasks: (task: TaskInterface) => {},
  setLists: (newlist: string) => {},
  updateTasks: (tasl: TaskInterface) => {},
  loadData: (task: TaskInterface[]) => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [tasks, setStateTasks] = useState<TaskInterface[]>([]); 
  const [lists, setLists] = useState<string[]>(["todo", "inprogress", "done"]);

  // const getData = useCallback(async () => {
  //     const response = await fetch(process.env.REACT_APP_URL)
  //     const data = await response.json()
  //     setTasks(data)
  // }, [])

  const postData = useCallback(async (task: TaskInterface) => {
    try {
      const response = await fetch(process.env.REACT_APP_URL || "", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something is wrong");
      }
      const data = await response.json();
      setStateTasks((prevState) => {
        return prevState.concat(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const patchData = useCallback(async (task: TaskInterface) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something is wrong");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setListsHandler = useCallback((newList: string) => {
    setLists((prevState) => [...prevState, newList]);
  }, []);

  const setTasksHandler = useCallback(
    (task: TaskInterface) => {
      postData(task);
    },
    [postData]
  );

  const loadDataHandler = useCallback((task: TaskInterface[]) => {
    setStateTasks(task);
   
  }, []);

  // const getDataHandler = () => {
  //     getData()
  // }

  const updateTasksHandler = useCallback(
    (task: TaskInterface) => {
      setStateTasks((prevState) => {
        const taskIndex = prevState.findIndex((t) => t.id === task.id);
        prevState[taskIndex] = { ...prevState[taskIndex], ...task };
        return [...prevState];
      });
      patchData(task);
    },
    [patchData]
  );
  const contextValue: TaskContextInterface = {
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

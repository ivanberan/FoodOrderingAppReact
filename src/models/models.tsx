export interface TaskInterface {
    id: string;
    title: string;
    description: string;
    state: string;
  }

  export interface UpdateTaskInterface {
    title?: string;
    description?: string;
    state?: string;
  }

  
 export interface TaskContextInterface {
    tasks: TaskInterface[];
    containerNames: string[];
    setTasks: (task: TaskInterface) => void;
    setLists: (newlist: string) => void;
    updateTasks: (tasl: TaskInterface) => void;
    loadData: (task: TaskInterface[]) => void;
  }
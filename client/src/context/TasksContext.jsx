import { createContext, useContext, useState } from "react";
import { createTaskRequest, deleteTaskRequest, getTaskRequest, getTasksRequest, updateTaskRequest } from '../api/task';

const TaskContext = createContext()

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider")
  }
  return context
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])

  const getTasks = async () => {
    try {
      const res = await getTasksRequest()
      setTasks(res.data)
    } catch (error) {
      console.error(error)
    }
    
  }

  const createTask = async (task) => {
    const res = await createTaskRequest(task)
    console.log('res-->', res)
  }

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id)
      if (res.status === 204) {
        setTasks(tasks.filter((task) =>{task._id !== id}))
      }
    } catch (error) {
      console.log("deleteTask::error-->", error)
    }
  }

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id)
      // console.log(res)
      return res.data
    } catch (error) {
      console.log("getTask::error-->", error)
    }
    
  }

  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task)
    } catch (error) {
      console.log("updateTask::error-->", error)
    }
    
  }
  
  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
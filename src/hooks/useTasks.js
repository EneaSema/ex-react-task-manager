import { useEffect, useReducer } from "react";
import tasksReducer from "../reducers/tasksReducer";
const { VITE_API_URL } = import.meta.env;

export default function useTasks() {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, []);

  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        dispatchTasks({ type: `LOAD_TASK`, payload: data });
      })
      .catch((error) => console.error(error));
  }, []);

  const addTask = async (newTask) => {
    const taskExists = tasks.some((t) => t.title === newTask.title);
    if (taskExists) {
      throw new Error("Task già presente");
    }
    const resp = await fetch(`${VITE_API_URL}/tasks`, {
      method: `POST`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const { success, message, task } = await resp.json();
    if (!success) throw new Error(message);
    dispatchTasks({ type: `ADD_TASK`, payload: task });
  };

  const removeTask = async (taskID) => {
    const resp = await fetch(`${VITE_API_URL}/tasks/${taskID}`, {
      method: `DELETE`,
    });
    const { success, message } = await resp.json();
    if (!success) throw new Error(message);
    dispatchTasks({ type: `REMOVE_TASK`, payload: taskID });
  };

  const removeMultipleTasks = async (taskIds) => {
    const deleteRequests = taskIds.map((taskID) =>
      fetch(`${VITE_API_URL}/tasks/${taskID}`, {
        method: `DELETE`,
      }).then((resp) => resp.json())
    );
    const results = await Promise.allSettled(deleteRequests);

    const fullFilledDeletions = [];
    const rejectedDeletions = [];
    results.forEach((result, index) => {
      const taskId = taskIds[index];
      if (result.status === "fulfilled" && result.value.success) {
        fullFilledDeletions.push(taskId);
      } else rejectedDeletions.push(taskId);
    });
    if (fullFilledDeletions.length > 0) {
      dispatchTasks({
        type: `REMOVE_MULTIPLE_TASKS`,
        payload: fullFilledDeletions,
      });
    }
    if (rejectedDeletions.length > 0) {
      throw new Error(
        `C'è stato un errore nell'eliminazione delle task con id: ${rejectedDeletions.join(
          ","
        )}`
      );
    }
  };

  const updateTask = async (updateTask) => {
    const taskWithSameTitle = tasks.find((t) => t.title === updateTask.title);
    if (taskWithSameTitle && taskWithSameTitle.id !== updateTask.id) {
      throw new Error("Task già presente");
    }
    const resp = await fetch(`${VITE_API_URL}/tasks/${updateTask.id}`, {
      method: `PUT`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateTask),
    });

    const { success, message, task } = await resp.json();
    if (!success) throw new Error(message);
    dispatchTasks({ type: `UPDATE_TASK`, payload: task });
  };

  return { tasks, addTask, removeTask, updateTask, removeMultipleTasks };
}

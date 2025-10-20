import { useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const addTask = async (newTask) => {
    const resp = await fetch(`${VITE_API_URL}/tasks`, {
      method: `POST`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const { success, message, task } = await resp.json();
    if (!success) throw new Error(message);
    setTasks((prev) => [...prev, task]);
  };

  const removeTask = async (taskID) => {
    const resp = await fetch(`${VITE_API_URL}/tasks/${taskID}`, {
      method: `DELETE`,
    });
    const { success, message } = await resp.json();
    if (!success) throw new Error(message);
    setTasks((tasks) => tasks.filter((t) => t.id !== taskID));
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
      setTasks((prev) =>
        prev.filter((t) => !fullFilledDeletions.includes(t.id))
      );
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
    const resp = await fetch(`${VITE_API_URL}/tasks/${updateTask.id}`, {
      method: `PUT`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateTask),
    });

    const { success, message, task: newTask } = await resp.json();
    if (!success) throw new Error(message);

    setTasks((prev) =>
      prev.map((oldTask) => (oldTask.id === newTask.id ? newTask : oldTask))
    );
  };

  return { tasks, addTask, removeTask, updateTask, removeMultipleTasks };
}

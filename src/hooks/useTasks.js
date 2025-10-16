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

  return { tasks, addTask, removeTask, updateTask };
}

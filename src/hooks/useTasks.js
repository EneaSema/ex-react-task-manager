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

  const addTask = () => {};
  const removeTask = () => {};
  const updateTask = () => {};

  return { tasks, addTask, removeTask, updateTask };
}

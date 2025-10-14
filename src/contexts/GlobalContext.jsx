import { createContext, useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/tasks`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  );
}

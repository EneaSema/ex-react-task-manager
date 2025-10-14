import { useContext } from "react";
import { GlobalContext } from "../contexts/Globalcontext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("tasks", tasks);
  return (
    <div>
      <h1>Lista dei Task da fare</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Stato</th>
            <th>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

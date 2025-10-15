import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../contexts/Globalcontext";
import useTasks from "../hooks/useTasks";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useContext(GlobalContext);
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) return <h2>Task non trovata</h2>;
  const handleDelete = () => {
    console.log("Elimina task", task.id);
  };
  return (
    <div>
      <h1>Task Detail</h1>
      <p>
        <strong>Nome:</strong>
        {task.title}
      </p>
      <p>
        <strong>Descrizione:{task.title}</strong>
      </p>
      <p>
        <strong>Stato:{task.status}</strong>
      </p>
      <p>
        <strong>Data di creazione:</strong>
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
      <button onClick={handleDelete}>Elimina Task</button>
    </div>
  );
}

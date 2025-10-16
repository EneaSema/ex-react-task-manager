import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/Globalcontext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);
  const task = tasks.find((t) => t.id === parseInt(id));

  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  if (!task) return <h2>Task non trovata</h2>;

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task elimnata con successo!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      alert("Task modificata con successo!");
      setShowEdit(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
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
      <button onClick={() => setShowModal(true)}>Elimina Task</button>
      <button onClick={() => setShowEdit(true)}>Modifica Task</button>

      <Modal
        title="Conferma Eliminazione"
        content={<p>Sei sicuro di voler eliminare questa task?</p>}
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        onConfirmText="Elimina"
      />
      <EditTaskModal
        task={task}
        show={showEdit}
        onClose={() => setShowEdit(false)}
        onSave={handleUpdate}
      />
    </div>
  );
}

import Modal from "./Modal";
import { useRef } from "react";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Modal
        title="Modifica Task"
        content={task}
        onConfirmText="Salva"
        onConfirm={handleSubmit}
      />
    </>
  );
}

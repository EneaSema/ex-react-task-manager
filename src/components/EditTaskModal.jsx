import Modal from "./Modal";
import { useRef, useState } from "react";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [editedTask, setEditedTask] = useState(task);
  const editFormRef = useRef();

  const changeEditedTask = (key, event) => {
    setEditedTask((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const { title, description, status } = editedTask;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <>
      <Modal
        title="Modifica Task"
        content={
          <form ref={editFormRef} onSubmit={handleSubmit}>
            <label>
              Nome Task:
              <input
                type="text"
                value={title}
                onChange={(e) => changeEditedTask(`title`, e)}
              />
            </label>
            <label>
              Descrizione Task:
              <textarea
                value={description}
                onChange={(e) => changeEditedTask(`description`, e)}
              />
            </label>
            <label>
              Stato Task:
              <select
                value={status}
                onChange={(e) => changeEditedTask(`status`, e)}
              >
                {[`To do`, `Doing`, `Done`].map((value, inedx) => {
                  return (
                    <option key={inedx} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </label>
          </form>
        }
        onConfirmText="Salva"
        show={show}
        onClose={onClose}
        onConfirm={() => editFormRef.current.requestSubmit()}
      />
    </>
  );
}

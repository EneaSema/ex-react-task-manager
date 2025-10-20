import { useState, useContext, useRef, useMemo } from "react";
import { GlobalContext } from "../contexts/Globalcontext";

const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~";`;

export default function AddTask() {
  const { addTask } = useContext(GlobalContext);
  const [title, setTitle] = useState(``);
  const descriptionRef = useRef();
  const statusRef = useRef();

  const titleValidation = useMemo(() => {
    if (!title.trim()) {
      return "Il nome della task non può essere vuoto e non può contenere simboli";
    }
    if ([...title].some((c) => symbols.includes(c))) {
      return "Il nome della task non può contenere simboli";
    }
    return ``;
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titleValidation) {
      return;
    }
    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };
    try {
      await addTask(newTask);
      alert("Task creata con successo!");
      setTitle(``);
      descriptionRef.current.value = ``;
      statusRef.current.value = `To do`;
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <h1>Aggiungi il nuovo Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome Task:
          <input
            type="text"
            placeholder="Nome del Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        {titleValidation && <p style={{ color: `red` }}>{titleValidation}</p>}
        <label>
          {" "}
          Descrizione:
          <textarea
            ref={descriptionRef}
            placeholder="Inserisci testo"
          ></textarea>
        </label>
        <label>
          {" "}
          Stato:
          <select ref={statusRef} defaultValue="To do">
            {[`To do`, `Doing`, `Done`].map((value, index) => {
              return (
                <option key={index} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </label>
        <button type="submit" disabled={titleValidation}>
          Aggiungi Task
        </button>
      </form>
    </div>
  );
}

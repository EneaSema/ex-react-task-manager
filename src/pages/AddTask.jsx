import { useState, useEffect, useRef, useMemo } from "react";

const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~";`;

const symbolsArray = symbols.split();

export default function AddTask() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleValidation) {
      return;
    }
    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };
    console.log(`Task da aggiungere`, newTask);
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
          <select ref={statusRef} defaultValue="To-do">
            <option value="to-do">To do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </label>
        <button type="submit" disabled={titleValidation}>
          Aggiungi Task
        </button>
      </form>
    </div>
  );
}

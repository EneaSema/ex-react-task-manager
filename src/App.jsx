import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";
import { GlobalProvider } from "./contexts/Globalcontext";

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <h1>EX - Task Manager Avanzato</h1>

        <nav>
          <NavLink to="/">Lista Task</NavLink>
          <NavLink to="/add">Aggiungi Task</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<TaskList />}></Route>
          <Route path="/add" element={<AddTask />}></Route>
          <Route path="/task/:id" element={<TaskDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

import { useContext, useMemo, useState } from "react";
import { GlobalContext } from "../contexts/Globalcontext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("tasks", tasks);

  const [sortBy, setSortBy] = useState(`createdAt`);
  const [sortOrder, setSortOrder] = useState(1);

  const sortIcon = sortOrder === 1 ? "↓" : "↑";

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const sortedTask = useMemo(() => {
    return [...tasks].sort((a, b) => {
      let comparison;
      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        const statusOption = ["To do", "Doing", "Done"];
        const indexA = statusOption.indexOf(a.status);
        const indexB = statusOption.indexOf(b.status);
        comparison = indexA - indexB;
      } else if (sortBy === "createdAt") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        comparison = dateA - dateB;
      }
      return comparison * sortOrder;
    });
  }, [tasks, sortBy, sortOrder]);

  return (
    <div>
      <h1>Lista dei Task da fare</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort(`title`)}>
              Nome {sortBy === "title" && sortIcon}
            </th>
            <th onClick={() => handleSort(`status`)}>
              Stauts {sortBy === "status" && sortIcon}{" "}
            </th>
            <th onClick={() => handleSort(`createdAt`)}>
              Data di Creazione {sortBy === "createdAt" && sortIcon}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTask.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

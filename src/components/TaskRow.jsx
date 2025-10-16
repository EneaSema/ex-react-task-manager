import { memo } from "react";
import { Link } from "react-router-dom";

const TaskRow = memo(({ task, checked, onToggle }) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(task.id)}
        ></input>
      </td>
      <td>
        <Link to={`/task/${task.id}`}>{task.title} </Link>
      </td>
      <td>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;

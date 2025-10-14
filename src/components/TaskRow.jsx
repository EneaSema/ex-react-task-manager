import { memo } from "react";

const TaskRow = memo(({ task }) => {
  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
});

export default TaskRow;
